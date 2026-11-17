export const PUBLISH_INTERVAL_MS = 66;

// The render loop runs every frame, but React only needs HUD-rate updates.
// Structural changes (phase, lane, boost, gate, countdown, any event) publish immediately.
export function shouldPublish(published, next, events, now, lastAt) {
  if (!published || events.length) return true;
  if (published.phase !== next.phase || published.lane !== next.lane || published.boosting !== next.boosting
    || published.gate !== next.gate || published.countdown !== next.countdown) return true;
  return now - lastAt >= PUBLISH_INTERVAL_MS;
}
