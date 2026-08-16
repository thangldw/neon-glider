import type { SourceTerm } from '../src/content/types';

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

export function parseSingleMeaning(response: unknown): string {
  const meaning = response && typeof response === 'object'
    ? (response as { meaning?: unknown }).meaning
    : undefined;
  if (typeof meaning !== 'string' || !meaning.trim() || meaning.includes('|')) {
    throw new SemanticResponseError('Ollama response has an invalid single Vietnamese meaning');
  }
  return meaning.trim();
}

export function parsePlainMeaning(response: string): string {
  const meaning = response.trim().replace(/^["'`]+|["'`]+$/g, '').replace(/\s+/g, ' ').trim();
  if (!meaning || meaning.length > 80 || meaning.includes('|') || /[\r\n{}\[\]]/.test(meaning)) {
    throw new SemanticResponseError('Ollama response has an invalid plain Vietnamese meaning');
  }
  return meaning;
}

export function attachOrderedMeanings(response: unknown, requested: SourceTerm[]): Record<string, string[]> {
  const meanings = response && typeof response === 'object'
    ? (response as { meanings?: unknown }).meanings
    : undefined;
  if (!Array.isArray(meanings) || meanings.length !== requested.length) {
    throw new SemanticResponseError('Ollama response length does not match requested terms');
  }

  const translations: Record<string, string[]> = {};
  for (const [index, meaningsVi] of meanings.entries()) {
    const id = requested[index]!.id;
    if (!Array.isArray(meaningsVi) || meaningsVi.length === 0
      || meaningsVi.some((meaning) => typeof meaning !== 'string' || !meaning.trim() || meaning.includes('|'))) {
      throw new SemanticResponseError(`Ollama response has invalid Vietnamese meanings for ${id}`);
    }
    translations[id] = meaningsVi.map((meaning) => meaning.trim());
  }
  return translations;
}
