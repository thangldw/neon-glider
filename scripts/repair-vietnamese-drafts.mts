import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { SourceSnapshot, SourceTerm } from '../src/content/types';
import { isVietnameseDraftMeaning } from '../src/content/validate';
import {
  createSingleMeaningSchema,
  createVietnameseRepairSchema,
  parsePlainMeaning,
  parseSingleMeaning,
  partitionVietnameseRepairMeanings,
  SemanticResponseError,
} from './draft-contract.mts';
import { postOllamaStream } from './ollama-transport.mts';
import { sanitizeRepairCheckpoint, type RepairCheckpoint } from './repair-checkpoint.mts';
import { runRepairRound } from './repair-scheduler.mts';
import { parseReviewCsv } from './build-content.mts';

const ROOT = resolve(import.meta.dirname, '..');
const SOURCE_PATH = resolve(ROOT, 'content/source/hsk3-2026.json');
const REVIEW_PATH = resolve(ROOT, 'content/review/hsk3-2026.vi.csv');
const CHECKPOINT_PATH = resolve(ROOT, 'work/repair-vietnamese-drafts-checkpoint.json');
const MODEL = 'qwen3.5:9b';
const BATCH_SIZE = Number(process.env.HANZI_REPAIR_BATCH_SIZE ?? '20');
const OLLAMA_URL = process.env.OLLAMA_HOST ?? 'http://127.0.0.1:11434';
const REQUEST_INACTIVITY_TIMEOUT_MS = Number(process.env.HANZI_REPAIR_TIMEOUT_MS ?? '15000');
const REQUEST_HARD_TIMEOUT_MS = 180_000;
const SINGLE_INACTIVITY_TIMEOUT_MS = 10_000;
const SINGLE_HARD_TIMEOUT_MS = 60_000;
const REPAIR_EXAMPLES = '能→có thể; 卡→thẻ; 可能→có khả năng; 满意→hài lòng; 能够→có thể; 全体→toàn thể; 什么样→loại nào; 体育→thể thao; 体育场→sân vận động; 外地→ngoại tỉnh; 信用卡→thẻ tín dụng; 银行卡→thẻ ngân hàng; 怎么样→như thế nào; 怎样→như thế nào; 只能→chỉ có thể; 福→phúc lành; 行→ngành nghề; 集体→tập thể; 具体→cụ thể; 世纪→thế kỷ; 世界→thế giới; 世界杯→giải vô địch thế giới; 幸运→may mắn; 优势→ưu thế; 整体→toàn thể; 制度→chế độ; 专门→chuyên môn; 作者→tác giả';

function csvCell(value: string): string {
  return /[",\n\r]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

function cleanMeanings(raw: string, term: SourceTerm): string[] {
  return raw.split('|').map((meaning) => meaning.trim()).filter((meaning) => isVietnameseDraftMeaning(meaning, term));
}

async function readCheckpoint(sourceById: Map<string, SourceTerm>): Promise<RepairCheckpoint> {
  try {
    const checkpoint = JSON.parse(await readFile(CHECKPOINT_PATH, 'utf8')) as RepairCheckpoint;
    const sanitized = sanitizeRepairCheckpoint(checkpoint, `ollama:${MODEL}`, sourceById, isVietnameseDraftMeaning);
    if (sanitized.droppedIds.length) {
      await saveCheckpoint(sanitized.checkpoint);
      console.warn(`Dropped ${sanitized.droppedIds.length} invalid repair checkpoint rows.`);
    }
    return sanitized.checkpoint;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return { model: `ollama:${MODEL}`, meanings: {} };
    throw error;
  }
}

async function saveCheckpoint(checkpoint: RepairCheckpoint): Promise<void> {
  await mkdir(resolve(ROOT, 'work'), { recursive: true });
  const temporary = `${CHECKPOINT_PATH}.tmp`;
  await writeFile(temporary, `${JSON.stringify(checkpoint, null, 2)}\n`);
  await rename(temporary, CHECKPOINT_PATH);
}

async function translateBatch(
  terms: SourceTerm[],
  strongerPrompt = false,
): Promise<{ accepted: Record<string, string>; rejected: SourceTerm[] }> {
  const content = await postOllamaStream(`${OLLAMA_URL}/api/chat`, {
      model: MODEL,
      stream: true,
      think: false,
      format: createVietnameseRepairSchema(terms.length),
      options: { temperature: 0, num_predict: Math.max(256, terms.length * 32) },
      messages: [{
        role: 'user',
        content: [
          'For every ordered Chinese term, return exactly one concise Vietnamese dictionary meaning.',
          'Vietnamese only: every meaning must contain at least one Vietnamese diacritic except a natural ASCII word such as hai; do not output Chinese, Japanese, Korean, English, pinyin, IDs, explanations, slash, or pipe characters.',
          'Examples: 房间→căn phòng; 放→đặt xuống; 飞→bay lượn; 高→ở trên; 给→đưa cho; 跟→cùng với; 网站→trang mạng; 二→hai.',
          REPAIR_EXAMPLES,
          ...(strongerPrompt ? ['Every item must be one plain Vietnamese string in the flat meanings array; never emit nested arrays or prose.'] : []),
          'Return only JSON object {"meanings":["..."]} in the same order.',
          JSON.stringify(terms.map(({ term, pinyin }) => [term, pinyin])),
        ].join('\n'),
      }],
    }, REQUEST_INACTIVITY_TIMEOUT_MS, REQUEST_HARD_TIMEOUT_MS);
  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new SemanticResponseError('Ollama response is not valid JSON');
  }
  return partitionVietnameseRepairMeanings(parsed, terms);
}

async function generateSingle(term: SourceTerm, format: object | undefined): Promise<string> {
  const content = await postOllamaStream(`${OLLAMA_URL}/api/generate`, {
      model: MODEL,
      stream: true,
      think: false,
      format,
      options: { temperature: 0, num_predict: 256 },
      prompt: format
        ? `Return only JSON {"meaning":"..."} with one concise Vietnamese dictionary meaning containing Vietnamese diacritics for ${term.term} (${term.pinyin}). No Chinese, English, pinyin, slash, pipe, labels, or explanation.`
        : `Return one concise Vietnamese dictionary meaning containing a Vietnamese diacritic only for ${term.term} (${term.pinyin}). No Chinese, English, pinyin, slash, pipe, labels, or explanation.`,
    }, SINGLE_INACTIVITY_TIMEOUT_MS, SINGLE_HARD_TIMEOUT_MS);
  if (!format) return parsePlainMeaning(content, term);
  try {
    return parseSingleMeaning(JSON.parse(content), term);
  } catch (error) {
    if (error instanceof SemanticResponseError) throw error;
    throw new SemanticResponseError('Ollama response is not valid JSON');
  }
}

async function repairSingleFallback(term: SourceTerm): Promise<string> {
  let lastError: unknown;
  for (const format of [createSingleMeaningSchema(), undefined]) {
    try {
      return await generateSingle(term, format);
    } catch (error) {
      lastError = error;
      console.warn(`Repair single attempt: ${error instanceof Error ? error.name : typeof error}`);
    }
  }
  throw lastError;
}

async function repairDrafts(): Promise<void> {
  if (!Number.isSafeInteger(BATCH_SIZE) || BATCH_SIZE < 1) throw new Error('HANZI_REPAIR_BATCH_SIZE must be a positive integer');
  if (!Number.isSafeInteger(REQUEST_INACTIVITY_TIMEOUT_MS) || REQUEST_INACTIVITY_TIMEOUT_MS < 1) {
    throw new Error('HANZI_REPAIR_TIMEOUT_MS must be a positive integer');
  }
  const [sourceRaw, reviewRaw] = await Promise.all([readFile(SOURCE_PATH, 'utf8'), readFile(REVIEW_PATH, 'utf8')]);
  const source = JSON.parse(sourceRaw) as SourceSnapshot;
  const rows = parseReviewCsv(reviewRaw);
  const rowsById = new Map(rows.map((row) => [row.id, row]));
  if (rowsById.size !== source.terms.length || source.terms.some((term) => !rowsById.has(term.id))) {
    throw new Error('Review CSV must have exactly one row for every source term');
  }
  if (rows.some((row) => row.reviewedBy.trim() || row.reviewedAt.trim())) {
    throw new Error('Refusing to repair rows with human review metadata');
  }
  const sourceById = new Map(source.terms.map((term) => [term.id, term]));
  const checkpoint = await readCheckpoint(sourceById);
  const targets = source.terms.filter((term) => cleanMeanings(rowsById.get(term.id)!.meaningsVi, term).length === 0);
  const pending = targets.filter((term) => !Object.hasOwn(checkpoint.meanings, term.id));
  const saveAccepted = async (meanings: Record<string, string>): Promise<void> => {
    if (!Object.keys(meanings).length) return;
    for (const [id, meaning] of Object.entries(meanings)) {
      const term = sourceById.get(id)!;
      if (!isVietnameseDraftMeaning(meaning, term)) throw new Error(`Invalid repaired Vietnamese meaning: ${id}`);
      checkpoint.meanings[id] = meaning;
    }
    await saveCheckpoint(checkpoint);
    const repairedTargetCount = targets.filter((term) => Object.hasOwn(checkpoint.meanings, term.id)).length;
    console.log(`Repaired ${repairedTargetCount}/${targets.length} rows.`);
  };

  const defer = (error: unknown, terms: SourceTerm[]) => {
    console.warn(`Deferring repair batch of ${terms.length}: ${error instanceof Error ? error.name : typeof error}`);
  };
  const firstRound = await runRepairRound(pending, BATCH_SIZE, (terms) => translateBatch(terms), saveAccepted, defer);
  const secondRound = await runRepairRound(firstRound, 5, (terms) => translateBatch(terms, true), saveAccepted, defer);
  for (const term of secondRound) {
    try {
      const singleBatch = await translateBatch([term], true);
      if (singleBatch.accepted[term.id]) {
        await saveAccepted(singleBatch.accepted);
        continue;
      }
    } catch (error) {
      console.warn(`Deferring repair singleton: ${error instanceof Error ? error.name : typeof error}`);
    }
    await saveAccepted({ [term.id]: await repairSingleFallback(term) });
  }
  if (targets.some((term) => !Object.hasOwn(checkpoint.meanings, term.id))) {
    throw new Error('Repair checkpoint is incomplete');
  }
  const csv = [
    'id,meaningsVi,reviewedBy,reviewedAt',
    ...source.terms.map((term) => {
      const row = rowsById.get(term.id)!;
      const meanings = cleanMeanings(row.meaningsVi, term);
      const repaired = meanings.length ? meanings : [checkpoint.meanings[term.id]!];
      return `${csvCell(term.id)},${csvCell(repaired.join('|'))},,`;
    }),
  ].join('\n');
  await writeFile(`${REVIEW_PATH}.tmp`, `${csv}\n`);
  await rename(`${REVIEW_PATH}.tmp`, REVIEW_PATH);
  console.log(`Repaired ${targets.length} draft rows; wrote ${source.terms.length} rows.`);
}

await repairDrafts();
