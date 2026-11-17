// Decide whether a global key handler should leave this key to the focused element.
export function shouldIgnoreKey(event) {
  const target = event.target;
  if (target?.closest?.("input, a, select, textarea")) return true;
  // Buttons keep native Enter/Space activation; lane and pause keys still work while one is focused.
  return Boolean(target?.closest?.("button")) && (event.key === "Enter" || event.code === "Space");
}
