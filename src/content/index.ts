import rawEntries from './generated.json';
import type { HanziEntry } from './types';
import { validateEntries } from './validate';

export function loadContent(): HanziEntry[] {
  const entries = structuredClone(rawEntries) as HanziEntry[];
  const errors = validateEntries(entries);
  if (errors.length) throw new Error(`Invalid HSK content: ${errors.join('; ')}`);
  return entries;
}
