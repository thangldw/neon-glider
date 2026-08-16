export interface RepairAttempt<Item, Accepted> {
  accepted: Accepted;
  rejected: Item[];
}

export async function runRepairRound<Item, Accepted>(
  items: Item[],
  batchSize: number,
  attempt: (batch: Item[]) => Promise<RepairAttempt<Item, Accepted>>,
  onAccepted: (accepted: Accepted) => Promise<void>,
  onDeferred?: (error: unknown, batch: Item[]) => void,
): Promise<Item[]> {
  const deferred: Item[] = [];
  for (let start = 0; start < items.length; start += batchSize) {
    const batch = items.slice(start, start + batchSize);
    try {
      const result = await attempt(batch);
      await onAccepted(result.accepted);
      deferred.push(...result.rejected);
    } catch (error) {
      onDeferred?.(error, batch);
      deferred.push(...batch);
    }
  }
  return deferred;
}
