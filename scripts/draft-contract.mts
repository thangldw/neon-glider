import type { SourceTerm } from '../src/content/types';
import { isVietnameseDraftMeaning } from '../src/content/validate';

export class SemanticResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SemanticResponseError';
  }
}

export function createOrderedResponseSchema(count: number): object {
  return {
    type: 'object',
    additionalProperties: false,
    required: ['meanings'],
    properties: {
      meanings: {
        type: 'array',
        minItems: count,
        maxItems: count,
        items: {
          type: 'array',
          minItems: 1,
          maxItems: 4,
          items: { type: 'string', minLength: 1, pattern: '^[^|]+$' },
        },
      },
    },
  };
}

export function createSingleMeaningSchema(): object {
  return {
    type: 'object',
    additionalProperties: false,
    required: ['meaning'],
    properties: {
      meaning: { type: 'string', minLength: 1, pattern: '^[^|]+$' },
    },
  };
}

export function createVietnameseRepairSchema(count: number): object {
  return {
    type: 'object',
    additionalProperties: false,
    required: ['meanings'],
    properties: {
      meanings: {
        type: 'array',
        minItems: count,
        maxItems: count,
        items: {
          type: 'string',
          minLength: 1,
          pattern: '^[^/|\\u4e00-\\u9fff\\u3040-\\u30ff\\uac00-\\ud7af]+$',
        },
      },
    },
  };
}

export function parseSingleMeaning(response: unknown, term: SourceTerm): string {
  const meaning = response && typeof response === 'object'
    ? (response as { meaning?: unknown }).meaning
    : undefined;
  if (typeof meaning !== 'string' || !meaning.trim() || meaning.includes('|')
    || !isVietnameseDraftMeaning(meaning, term)) {
    throw new SemanticResponseError('Ollama response has an invalid single Vietnamese meaning');
  }
  return meaning.trim();
}

export function parsePlainMeaning(response: string, term: SourceTerm): string {
  const meaning = response.trim().replace(/^["'`]+|["'`]+$/g, '').replace(/\s+/g, ' ').trim();
  if (!meaning || meaning.length > 80 || meaning.includes('|') || /[\r\n{}\[\]]/.test(meaning)
    || !isVietnameseDraftMeaning(meaning, term)) {
    throw new SemanticResponseError('Ollama response has an invalid plain Vietnamese meaning');
  }
  return meaning;
}

function extractOrderedMeanings(response: unknown, requested: SourceTerm[]): string[][] {
  const meanings = response && typeof response === 'object'
    ? (response as { meanings?: unknown }).meanings
    : undefined;
  if (!Array.isArray(meanings) || meanings.length !== requested.length) {
    throw new SemanticResponseError('Ollama response length does not match requested terms');
  }
  return meanings.map((meaningsVi, index) => {
    if (!Array.isArray(meaningsVi) || meaningsVi.length === 0
      || meaningsVi.some((meaning) => typeof meaning !== 'string' || !meaning.trim() || meaning.includes('|'))) {
      throw new SemanticResponseError(`Ollama response has invalid Vietnamese meanings for ${requested[index]!.id}`);
    }
    return meaningsVi.map((meaning) => meaning.trim());
  });
}

export function partitionVietnameseRepairMeanings(
  response: unknown,
  requested: SourceTerm[],
): { accepted: Record<string, string>; rejected: SourceTerm[] } {
  const meanings = response && typeof response === 'object'
    ? (response as { meanings?: unknown }).meanings
    : undefined;
  if (!Array.isArray(meanings) || meanings.length !== requested.length
    || meanings.some((meaning) => typeof meaning !== 'string' || !meaning.trim() || meaning.includes('|'))) {
    throw new SemanticResponseError('Ollama repair response does not match requested terms');
  }
  const accepted: Record<string, string> = {};
  const rejected: SourceTerm[] = [];
  for (const [index, meaning] of meanings.entries()) {
    const term = requested[index]!;
    if (isVietnameseDraftMeaning(meaning as string, term)) accepted[term.id] = (meaning as string).trim();
    else rejected.push(term);
  }
  return { accepted, rejected };
}

export function attachOrderedMeanings(response: unknown, requested: SourceTerm[]): Record<string, string[]> {
  const ordered = extractOrderedMeanings(response, requested);
  const translations: Record<string, string[]> = {};
  for (const [index, meaningsVi] of ordered.entries()) {
    const id = requested[index]!.id;
    if (meaningsVi.some((meaning) => !isVietnameseDraftMeaning(meaning, requested[index]!))) {
      throw new SemanticResponseError(`Ollama response has invalid Vietnamese meanings for ${id}`);
    }
    translations[id] = meaningsVi;
  }
  return translations;
}
