import type { SourceTerm } from '../src/content/types';

export interface RepairCheckpoint {
  model: string;
  meanings: Record<string, string>;
}

export function sanitizeRepairCheckpoint(
  checkpoint: RepairCheckpoint,
  model: string,
  sourceById: Map<string, SourceTerm>,
  isValidMeaning: (meaning: string, term: SourceTerm) => boolean,
): { checkpoint: RepairCheckpoint; droppedIds: string[] } {
  if (checkpoint.model !== model || !checkpoint.meanings || typeof checkpoint.meanings !== 'object') {
    throw new Error('Repair checkpoint has an invalid model or structure');
  }
  const meanings: Record<string, string> = {};
  const droppedIds: string[] = [];
  for (const [id, meaning] of Object.entries(checkpoint.meanings)) {
    const term = sourceById.get(id);
    if (!term || typeof meaning !== 'string') throw new Error(`Repair checkpoint has invalid translation: ${id}`);
    if (isValidMeaning(meaning, term)) meanings[id] = meaning;
    else droppedIds.push(id);
  }
  return { checkpoint: { model: checkpoint.model, meanings }, droppedIds };
}
