export function readStore(key, fallback) {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}

export function writeStore(key, value) {
  try { localStorage.setItem(key, String(value)); } catch { /* storage unavailable */ }
}
