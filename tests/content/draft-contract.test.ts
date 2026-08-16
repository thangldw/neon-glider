import { describe, expect, it } from 'vitest';
import {
  attachOrderedMeanings,
  createOrderedResponseSchema,
  createSingleMeaningSchema,
  parsePlainMeaning,
  parseSingleMeaning,
} from '../../scripts/draft-contract.mts';

describe('attachOrderedMeanings', () => {
  const requested = [
    { id: 'hsk3-l1-0001', term: '爱', pinyin: 'ài', level: 1 as const, sourceOrder: 1 },
    { id: 'hsk3-l1-0002', term: '爱好', pinyin: 'àihào', level: 1 as const, sourceOrder: 2 },
  ];

  it('attaches ordered model meanings to their requested ids', () => {
    expect(attachOrderedMeanings({ meanings: [['yêu'], ['sở thích']] }, requested)).toEqual({
      'hsk3-l1-0001': ['yêu'],
      'hsk3-l1-0002': ['sở thích'],
    });
  });

  it('rejects a response whose length does not match the request', () => {
    expect(() => attachOrderedMeanings({ meanings: [['yêu']] }, requested))
      .toThrow('Ollama response length does not match requested terms');
  });

  it('constrains a model response to exactly one bounded meanings array per request item', () => {
    expect(createOrderedResponseSchema(2)).toMatchObject({
      type: 'object',
      required: ['meanings'],
      additionalProperties: false,
      properties: {
        meanings: {
          type: 'array',
          minItems: 2,
          maxItems: 2,
          items: {
            type: 'array',
            minItems: 1,
            maxItems: 4,
            items: { type: 'string', minLength: 1, pattern: '^[^|]+$' },
          },
        },
      },
    });
  });

  it('accepts one validated single-term fallback meaning', () => {
    expect(parseSingleMeaning({ meaning: 'vững chắc' })).toBe('vững chắc');
    expect(createSingleMeaningSchema()).toMatchObject({
      type: 'object',
      required: ['meaning'],
      additionalProperties: false,
      properties: { meaning: { type: 'string', minLength: 1, pattern: '^[^|]+$' } },
    });
  });

  it('sanitizes a bounded plain-text fallback meaning', () => {
    expect(parsePlainMeaning('  "vững chắc"  ')).toBe('vững chắc');
  });
});
