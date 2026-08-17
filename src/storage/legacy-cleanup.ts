type StorageLike = Pick<Storage, 'removeItem'>;
type StorageProvider = () => StorageLike;

export function clearLegacyLearningKeys(session: StorageProvider, local: StorageProvider): void {
  try {
    session().removeItem('hanzi-glider.run');
  } catch {
    // Retired storage must never block startup.
  }

  try {
    local().removeItem('hanzi-glider.progress');
  } catch {
    // Retired storage must never block startup.
  }
}
