import { describe, expect, it } from 'vitest';
import { sanitizeRepairCheckpoint } from '../../scripts/repair-checkpoint.mts';

describe('sanitizeRepairCheckpoint', () => {
  it('drops a newly invalid scratch translation so it is regenerated', () => {
    const result = sanitizeRepairCheckpoint(
      { model: 'ollama:qwen3.5:9b', meanings: { invalid: 'phụ nữ/woman' } },
      'ollama:qwen3.5:9b',
      new Map([['invalid', { id: 'invalid', term: '妇女', pinyin: 'fùnǚ', level: 1, sourceOrder: 1 }]]),
      () => false,
    );

    expect(result).toEqual({ checkpoint: { model: 'ollama:qwen3.5:9b', meanings: {} }, droppedIds: ['invalid'] });
  });
});
