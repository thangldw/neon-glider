type StorageLike = Pick<Storage, 'removeItem'>;

export function clearLegacyLearningKeys(session: StorageLike, local: StorageLike): void {
  try {
    session.removeItem('hanzi-glider.run');
  } catch {
    // Retired storage must never block startup.
  }

  try {
    local.removeItem('hanzi-glider.progress');
  } catch {
    // Retired storage must never block startup.
  }
}
