import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { SourceSnapshot, SourceTerm } from '../src/content/types';
import {
  attachOrderedMeanings,
  createOrderedResponseSchema,
  createSingleMeaningSchema,
  parsePlainMeaning,
  parseSingleMeaning,
  SemanticResponseError,
} from './draft-contract.mts';

const ROOT = resolve(import.meta.dirname, '..');
const SOURCE_PATH = resolve(ROOT, 'content/source/hsk3-2026.json');
const OUTPUT_PATH = resolve(ROOT, 'content/review/hsk3-2026.vi.csv');
const CHECKPOINT_PATH = resolve(ROOT, 'work/draft-meanings-checkpoint.json');
const MODEL = 'qwen3.5:9b';
const BATCH_SIZE = Number(process.env.HANZI_DRAFT_BATCH_SIZE ?? '20');
const OLLAMA_URL = process.env.OLLAMA_HOST ?? 'http://127.0.0.1:11434';
const MAX_TRANSPORT_ATTEMPTS = 2;
const REQUEST_TIMEOUT_MS = Number(process.env.HANZI_DRAFT_TIMEOUT_MS ?? '45000');
const SINGLE_REQUEST_TIMEOUT_MS = 15_000;

interface DraftCheckpoint {
  model: `ollama:${string}`;
  translations: Record<string, string[]>;
}

class HttpResponseError extends Error {
  constructor(readonly status: number) {
    super(`Ollama request failed: ${status}`);
    this.name = 'HttpResponseError';
  }
}

function csvCell(value: string): string {
  return /[",\n\r]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

async function readCheckpoint(sourceIds: Set<string>): Promise<DraftCheckpoint> {
  try {
    const checkpoint = JSON.parse(await readFile(CHECKPOINT_PATH, 'utf8')) as DraftCheckpoint;
    if (checkpoint.model !== `ollama:${MODEL}` || !checkpoint.translations || typeof checkpoint.translations !== 'object') {
      throw new Error('Draft checkpoint has an invalid model or structure');
    }
    for (const [id, meaningsVi] of Object.entries(checkpoint.translations)) {
      if (!sourceIds.has(id) || !Array.isArray(meaningsVi) || meaningsVi.length === 0
        || meaningsVi.some((meaning) => typeof meaning !== 'string' || !meaning.trim() || meaning.includes('|'))) {
        throw new Error(`Draft checkpoint has invalid translation: ${id}`);
      }
    }
    return checkpoint;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return { model: `ollama:${MODEL}`, translations: {} };
    }
    throw error;
  }
}

async function saveCheckpoint(checkpoint: DraftCheckpoint): Promise<void> {
  await mkdir(resolve(ROOT, 'work'), { recursive: true });
  const temporaryPath = `${CHECKPOINT_PATH}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(checkpoint, null, 2)}\n`);
  await rename(temporaryPath, CHECKPOINT_PATH);
}

async function translateBatch(terms: SourceTerm[]): Promise<Record<string, string[]>> {
  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    body: JSON.stringify({
      model: MODEL,
      stream: false,
      think: false,
      format: createOrderedResponseSchema(terms.length),
      options: { temperature: 0, num_predict: 1536 },
      messages: [{
        role: 'user',
        content: [
          'Return concise Vietnamese dictionary senses for this ordered list.',
          'Output JSON object {"meanings":[...]} with exactly one non-empty string array per input item in the same order. No IDs, prose, or pipe characters.',
          JSON.stringify(terms.map(({ term, pinyin }) => [term, pinyin])),
        ].join('\n'),
      }],
    }),
  });
  if (!response.ok) throw new HttpResponseError(response.status);
  const body = await response.json() as { message?: { content?: unknown } };
  if (typeof body.message?.content !== 'string') {
    throw new SemanticResponseError('Ollama response has no message content');
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(body.message.content);
  } catch {
    throw new SemanticResponseError('Ollama response is not valid JSON');
  }
  return attachOrderedMeanings(parsed, terms);
}

async function generateSingle(term: SourceTerm, format: object | undefined): Promise<string> {
  const response = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    signal: AbortSignal.timeout(SINGLE_REQUEST_TIMEOUT_MS),
    body: JSON.stringify({
      model: MODEL,
      stream: false,
      think: false,
      format,
      options: { temperature: 0, num_predict: 64 },
      prompt: format
        ? `Return only JSON {"meaning":"..."} with one concise Vietnamese dictionary meaning for [${JSON.stringify(term.term)}, ${JSON.stringify(term.pinyin)}].`
        : `Return one concise Vietnamese dictionary meaning only, no labels or punctuation: ${term.term} (${term.pinyin})`,
    }),
  });
  if (!response.ok) throw new HttpResponseError(response.status);
  const body = await response.json() as { response?: unknown };
  if (typeof body.response !== 'string') throw new SemanticResponseError('Ollama response has no generated text');
  if (!format) return parsePlainMeaning(body.response);
  try {
    return parseSingleMeaning(JSON.parse(body.response));
  } catch (error) {
    if (error instanceof SemanticResponseError) throw error;
    throw new SemanticResponseError('Ollama response is not valid JSON');
  }
}

async function translateSingleFallback(term: SourceTerm): Promise<string> {
  try {
    return await generateSingle(term, createSingleMeaningSchema());
  } catch (error) {
    console.warn(`Single fallback structured attempt: ${error instanceof Error ? error.name : typeof error}`);
    return generateSingle(term, undefined);
  }
}

async function translateBatchWithRetry(
  terms: SourceTerm[],
  onAccepted: (translations: Record<string, string[]>) => Promise<void>,
): Promise<Record<string, string[]>> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_TRANSPORT_ATTEMPTS; attempt += 1) {
    try {
      const translations = await translateBatch(terms);
      await onAccepted(translations);
      return translations;
    } catch (error) {
      lastError = error;
      const retryable = error instanceof TypeError
        || (error instanceof DOMException && error.name !== 'TimeoutError')
        || (error instanceof HttpResponseError && error.status >= 500);
      if (retryable && attempt < MAX_TRANSPORT_ATTEMPTS) {
        const errorClass = error instanceof Error ? error.name : typeof error;
        console.warn(`Retrying batch after attempt ${attempt}: ${errorClass}`);
        continue;
      }
      break;
    }
  }
  if (terms.length > 1) {
    const midpoint = Math.ceil(terms.length / 2);
    console.warn(`Splitting rejected ${terms.length}-term batch.`);
    const left = await translateBatchWithRetry(terms.slice(0, midpoint), onAccepted);
    const right = await translateBatchWithRetry(terms.slice(midpoint), onAccepted);
    return { ...left, ...right };
  }
  const translations = { [terms[0]!.id]: [await translateSingleFallback(terms[0]!)] };
  await onAccepted(translations);
  return translations;
}

async function ensureOutputIsSafeToWrite(): Promise<void> {
  try {
    const existing = await readFile(OUTPUT_PATH, 'utf8');
    if (existing.trim()) throw new Error(`Refusing to overwrite existing review CSV: ${OUTPUT_PATH}`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
}

async function draftMeanings(): Promise<void> {
  if (!Number.isSafeInteger(BATCH_SIZE) || BATCH_SIZE < 1) throw new Error('HANZI_DRAFT_BATCH_SIZE must be a positive integer');
  if (!Number.isSafeInteger(REQUEST_TIMEOUT_MS) || REQUEST_TIMEOUT_MS < 1) {
    throw new Error('HANZI_DRAFT_TIMEOUT_MS must be a positive integer');
  }
  await ensureOutputIsSafeToWrite();
  const source = JSON.parse(await readFile(SOURCE_PATH, 'utf8')) as SourceSnapshot;
  const sourceIds = new Set(source.terms.map((term) => term.id));
  if (sourceIds.size !== source.terms.length) throw new Error('Source terms contain duplicate ids');
  const checkpoint = await readCheckpoint(sourceIds);
  const remaining = source.terms.filter((term) => !Object.hasOwn(checkpoint.translations, term.id));
  const checkpointAccepted = async (translations: Record<string, string[]>): Promise<void> => {
    Object.assign(checkpoint.translations, translations);
    await saveCheckpoint(checkpoint);
    console.log(`Drafted ${Object.keys(checkpoint.translations).length}/${source.terms.length} terms.`);
  };

  for (let start = 0; start < remaining.length; start += BATCH_SIZE) {
    const batch = remaining.slice(start, start + BATCH_SIZE);
    await translateBatchWithRetry(batch, checkpointAccepted);
  }

  const missing = source.terms.filter((term) => !Object.hasOwn(checkpoint.translations, term.id));
  if (missing.length) throw new Error(`Draft checkpoint is incomplete: ${missing.length} terms missing`);
  const csv = [
    'id,meaningsVi,reviewedBy,reviewedAt',
    ...source.terms.map((term) => `${csvCell(term.id)},${csvCell(checkpoint.translations[term.id]!.join('|'))},,`),
  ].join('\n');
  await mkdir(resolve(ROOT, 'content/review'), { recursive: true });
  await writeFile(OUTPUT_PATH, `${csv}\n`);
  console.log(`Wrote ${source.terms.length} AI draft rows using ollama:${MODEL}.`);
}

await draftMeanings();
