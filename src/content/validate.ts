import type { HanziEntry } from './types';

export function validateEntries(entries: HanziEntry[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const entry of entries) {
    if (ids.has(entry.id)) errors.push(`duplicate id: ${entry.id}`);
    ids.add(entry.id);
    if (![1, 2, 3].includes(entry.level)) errors.push(`${entry.id}: invalid level`);
    if (!entry.term.trim()) errors.push(`${entry.id}: term must not be empty`);
    if (!entry.pinyin.trim()) errors.push(`${entry.id}: pinyin must not be empty`);
    if (entry.meaningsVi.length === 0 || entry.meaningsVi.some((item) => !item.trim())) {
      errors.push(`${entry.id}: meaningsVi must not be empty`);
    }
  }

  return errors;
}
