import { describe, expect, it } from 'vitest';
import {
  attachOrderedMeanings,
  createOrderedResponseSchema,
  createSingleMeaningSchema,
  createVietnameseRepairSchema,
  parsePlainMeaning,
  parseSingleMeaning,
  partitionVietnameseRepairMeanings,
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

  it('rejects Han and English meanings returned by the model', () => {
    expect(() => attachOrderedMeanings({ meanings: [['爱'], ['six']] }, requested))
      .toThrow('Ollama response has invalid Vietnamese meanings for hsk3-l1-0001');
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
    expect(parseSingleMeaning({ meaning: 'vững chắc' }, requested[0]!)).toBe('vững chắc');
    expect(createSingleMeaningSchema()).toMatchObject({
      type: 'object',
      required: ['meaning'],
      additionalProperties: false,
      properties: { meaning: { type: 'string', minLength: 1, pattern: '^[^|]+$' } },
    });
    expect(createSingleMeaningSchema(['bao'])).toMatchObject({
      properties: { meaning: { pattern: expect.stringContaining('b') } },
    });
  });

  it('sanitizes a bounded plain-text fallback meaning', () => {
    expect(parsePlainMeaning('  "vững chắc"  ', requested[0]!)).toBe('vững chắc');
  });

  it('constrains repair batches to a flat, exact-length meanings array', () => {
    const schema = createVietnameseRepairSchema(2);
    expect(schema).toMatchObject({
      type: 'object',
      required: ['meanings'],
      properties: {
        meanings: {
          minItems: 2,
          maxItems: 2,
          items: { type: 'string', minLength: 1, pattern: expect.stringContaining('\\u4e00') },
        },
      },
    });
    expect(JSON.stringify(schema)).toContain('^[^/|');
  });

  it('keeps valid repair positions and requeues invalid positions', () => {
    expect(partitionVietnameseRepairMeanings({ meanings: ['mặc', 'six'] }, requested)).toEqual({
      accepted: { 'hsk3-l1-0001': 'mặc' },
      rejected: [requested[1]],
    });
  });
});
