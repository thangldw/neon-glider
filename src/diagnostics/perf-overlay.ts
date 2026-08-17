export interface RendererDiagnostics {
  drawCalls: number;
  geometries: number;
  textures: number;
}

export interface PerformanceSnapshot {
  sampleCount: number;
  medianFrameTimeMs: number;
  worstFrameTimeMs: number;
  slowFrameCount: number;
  longestSlowFrameStreak: number;
  maxDrawCalls: number;
  maxGeometries: number;
  maxTextures: number;
}

export interface PerfEvidence extends PerformanceSnapshot {
  project: 'desktop-chromium' | 'mobile-chromium';
}

export interface PerfMonitor {
  record(timestampMs: number, renderer: RendererDiagnostics): void;
  reset(): void;
  snapshot(): PerformanceSnapshot;
  dispose(): void;
}

const SLOW_FRAME_MS = 50;
const MAX_SAMPLES = 6_000;

function finiteNonNegative(value: number): number {
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

function median(values: readonly number[]): number {
  if (values.length === 0) return 0;
  const ordered = [...values].sort((left, right) => left - right);
  const middle = Math.floor(ordered.length / 2);
  return ordered.length % 2 === 0
    ? (ordered[middle - 1] + ordered[middle]) / 2
    : ordered[middle];
}

export function createPerfMonitor(options: { visible: boolean; host?: HTMLElement }): PerfMonitor {
  const samples: number[] = [];
  let previousTimestamp: number | null = null;
  let slowFrameCount = 0;
  let slowFrameStreak = 0;
  let longestSlowFrameStreak = 0;
  let maxDrawCalls = 0;
  let maxGeometries = 0;
  let maxTextures = 0;
  let disposed = false;

  const overlay = options.visible ? document.createElement('output') : null;
  if (overlay) {
    overlay.className = 'perf-overlay';
    overlay.dataset.perfOverlay = '';
    overlay.setAttribute('aria-label', 'Chẩn đoán hiệu năng');
    (options.host ?? document.body).append(overlay);
  }

  const snapshot = (): PerformanceSnapshot => ({
    sampleCount: samples.length,
    medianFrameTimeMs: median(samples),
    worstFrameTimeMs: samples.length ? Math.max(...samples) : 0,
    slowFrameCount,
    longestSlowFrameStreak,
    maxDrawCalls,
    maxGeometries,
    maxTextures,
  });

  const refreshOverlay = () => {
    if (!overlay) return;
    const current = snapshot();
    overlay.textContent = `${current.medianFrameTimeMs.toFixed(1)} ms · ${current.maxDrawCalls} calls · ${current.maxGeometries} geo · ${current.maxTextures} tex`;
  };

  return {
    record(timestampMs, renderer) {
      if (disposed || !Number.isFinite(timestampMs)) return;
      maxDrawCalls = Math.max(maxDrawCalls, finiteNonNegative(renderer.drawCalls));
      maxGeometries = Math.max(maxGeometries, finiteNonNegative(renderer.geometries));
      maxTextures = Math.max(maxTextures, finiteNonNegative(renderer.textures));

      if (previousTimestamp !== null && timestampMs > previousTimestamp) {
        const frameTime = timestampMs - previousTimestamp;
        if (samples.length === MAX_SAMPLES) samples.shift();
        samples.push(frameTime);
        if (frameTime > SLOW_FRAME_MS) {
          slowFrameCount += 1;
          slowFrameStreak += 1;
          longestSlowFrameStreak = Math.max(longestSlowFrameStreak, slowFrameStreak);
        } else {
          slowFrameStreak = 0;
        }
      } else if (previousTimestamp !== null) {
        slowFrameStreak = 0;
      }
      previousTimestamp = timestampMs;
      refreshOverlay();
    },
    reset() {
      samples.length = 0;
      previousTimestamp = null;
      slowFrameCount = 0;
      slowFrameStreak = 0;
      longestSlowFrameStreak = 0;
      maxDrawCalls = 0;
      maxGeometries = 0;
      maxTextures = 0;
      refreshOverlay();
    },
    snapshot,
    dispose() {
      if (disposed) return;
      disposed = true;
      overlay?.remove();
    },
  };
}
