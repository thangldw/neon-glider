import type { HanziEntry } from './types';

const CJK_OR_HAN = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;
const VIETNAMESE_ORTHOGRAPHY = /[\u00c0-\u00c3\u00c8-\u00ca\u00cc-\u00cd\u00d2-\u00d5\u00d9-\u00da\u00dd\u00e0-\u00e3\u00e8-\u00ea\u00ec-\u00ed\u00f2-\u00f5\u00f9-\u00fa\u00fd\u0102\u0103\u0110\u0111\u0128\u0129\u0168\u0169\u01a0\u01a1\u01af\u01b0\u1ea0-\u1ef9]/u;
const DRAFT_CHARACTERS = /^[\p{Script=Latin}\p{M}\d\s.,;:()'’+\-–]+$/u;
// Derived from the round-3 CSV scan; see content/review/vi-ascii-token-allowlist.md.
const SAFE_UNACCENTED_VIETNAMESE_TOKENS = new Set([
  'ai', 'an', 'anh', 'ba', 'ban', 'bao', 'bay', 'bia', 'ca', 'cam', 'canh', 'cao', 'cha',
  'chai', 'che', 'chi', 'chia', 'chim', 'cho', 'chu', 'chung', 'coi', 'con', 'cong',
  'da', 'danh', 'di', 'dinh', 'do', 'doanh', 'du', 'dung', 'duy', 'em', 'ga',
  'ghi', 'gia', 'giai', 'gian', 'giao', 'hai', 'han', 'hay', 'hoa', 'hoan',
  'hoang', 'huy', 'im', 'in', 'khai', 'khao', 'khi', 'khoa', 'khoe', 'khu', 'khuya', 'kia',
  'kim', 'kinh', 'la', 'lai', 'lam', 'lan', 'lao', 'leo', 'linh', 'lo', 'lui', 'ly',
  'mai', 'mang', 'mau', 'mi', 'minh', 'mong', 'mua', 'nam', 'nan', 'nay', 'ngay',
  'nghe', 'nghi', 'ngon', 'nguy', 'nhanh', 'nhau', 'nhu', 'ninh', 'non', 'nua', 'phim',
  'phong', 'phu', 'qua', 'quan', 'quang', 'quanh', 'quay', 'quen', 'quy', 'ra', 'rau',
  'ro', 'sai', 'san', 'sang', 'sao', 'sau', 'say', 'sinh', 'sung', 'suy', 'ta', 'tai',
  'tan', 'tao', 'taxi', 'tay', 'tem', 'tham', 'thanh', 'thao', 'thay', 'theo', 'thi',
  'thu', 'ti', 'tim', 'tin', 'tinh', 'tivi', 'tra', 'trai', 'trang', 'tranh', 'trao',
  'treo', 'trong', 'trung', 'tu', 'tuy', 'ty', 'va', 'vai', 'vang', 'vay', 'ven', 'vi',
  'vinh', 'vui', 'xa', 'xanh', 'xe', 'xem', 'xin', 'xinh', 'xong', 'xu', 'xung', 'y',
]);

function normalizeForEcho(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
}

function normalizedTokens(value: string): string[] {
  return (value.match(/\p{L}+/gu) ?? []).map(normalizeForEcho).filter(Boolean);
}

function hasOnlyVietnameseTokens(value: string): boolean {
  return (value.match(/\p{L}+/gu) ?? []).every((token) => (
    VIETNAMESE_ORTHOGRAPHY.test(token) || SAFE_UNACCENTED_VIETNAMESE_TOKENS.has(token.toLocaleLowerCase())
  ));
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
  const pinyin = normalizeForEcho(entry.pinyin);
  const pinyinTokens = new Set(normalizedTokens(entry.pinyin));
  if (normalizedTokens(trimmed).some((token) => pinyinTokens.has(token))) return false;
  if (normalized === normalizeForEcho(entry.term)
    || normalized === pinyin) return false;
  return hasOnlyVietnameseTokens(trimmed);
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
