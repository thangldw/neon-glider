import type { HanziEntry } from './types';

const CJK_OR_HAN = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;
const VIETNAMESE_ORTHOGRAPHY = /[\u0102\u0103\u00c2\u00e2\u0110\u0111\u00ca\u00ea\u00d4\u00f4\u01a0\u01a1\u01af\u01b0\u00c0-\u00ff\u1ea0-\u1ef9]/u;
const DRAFT_CHARACTERS = /^[\p{Script=Latin}\p{M}\d\s.,;:()/'’+\-–]+$/u;
const ASCII_VIETNAMESE_DRAFT_ALLOWLIST = new Set([
  'hai', 'mua', 'tay', 'tham gia', 'sinh ra', 'xe taxi', 'chim', 'trong tim',
  'dao', 'con dao', 'cha', 'bia', 'xung quanh', 'bao quanh',
]);

function normalizeForEcho(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
}

export function isVietnameseDraftMeaning(
  meaning: string,
  entry: Pick<HanziEntry, 'term' | 'pinyin'>,
): boolean {
  const trimmed = meaning.trim();
  if (!trimmed || CJK_OR_HAN.test(trimmed) || !DRAFT_CHARACTERS.test(trimmed)) {
    return false;
  }
  const normalized = normalizeForEcho(trimmed);
  if (normalized === normalizeForEcho(entry.term) || normalized === normalizeForEcho(entry.pinyin)) return false;
  return VIETNAMESE_ORTHOGRAPHY.test(trimmed) || ASCII_VIETNAMESE_DRAFT_ALLOWLIST.has(trimmed.toLocaleLowerCase());
}

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
    if (entry.meaningsVi.some((item) => !isVietnameseDraftMeaning(item, entry))) {
      errors.push(`${entry.id}: meaningsVi must use Vietnamese draft syntax`);
    }
  }

  return errors;
}
