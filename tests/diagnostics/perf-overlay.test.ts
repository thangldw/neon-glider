import { describe, expect, it } from 'vitest';
import { createPerfMonitor } from '../../src/diagnostics/perf-overlay';

describe('performance monitor', () => {
  it('summarizes real frame intervals and renderer maxima', () => {
    const monitor = createPerfMonitor({ visible: false });

    monitor.record(100, { drawCalls: 8, geometries: 4, textures: 3 });
    monitor.record(116, { drawCalls: 9, geometries: 5, textures: 4 });
    monitor.record(134, { drawCalls: 7, geometries: 4, textures: 2 });
    monitor.record(194, { drawCalls: 11, geometries: 6, textures: 5 });

    expect(monitor.snapshot()).toEqual({
      sampleCount: 3,
      medianFrameTimeMs: 18,
      worstFrameTimeMs: 60,
      slowFrameCount: 1,
      longestSlowFrameStreak: 1,
      maxDrawCalls: 11,
      maxGeometries: 6,
      maxTextures: 5,
    });
    monitor.dispose();
  });

  it('ignores non-finite and non-monotonic frame timestamps', () => {
    const monitor = createPerfMonitor({ visible: false });

    monitor.record(100, { drawCalls: 1, geometries: 1, textures: 1 });
    monitor.record(Number.NaN, { drawCalls: 99, geometries: 99, textures: 99 });
    monitor.record(90, { drawCalls: 2, geometries: 2, textures: 2 });
    monitor.record(106, { drawCalls: 3, geometries: 3, textures: 3 });

    expect(monitor.snapshot()).toMatchObject({
      sampleCount: 1,
      medianFrameTimeMs: 16,
      worstFrameTimeMs: 16,
      maxDrawCalls: 3,
    });
    monitor.dispose();
  });

  it('renders and cleans up the development overlay without owning the app root', () => {
    const host = document.createElement('main');
    const monitor = createPerfMonitor({ visible: true, host });

    monitor.record(100, { drawCalls: 8, geometries: 4, textures: 3 });
    monitor.record(116, { drawCalls: 8, geometries: 4, textures: 3 });

    expect(host.querySelector('[data-perf-overlay]')?.textContent).toContain('16.0 ms');
    expect(host.querySelector('[data-perf-overlay]')?.getAttribute('aria-label')).toBe('Performance diagnostics');
    monitor.dispose();
    expect(host.querySelector('[data-perf-overlay]')).toBeNull();
  });

  it('resets samples and resource maxima before a bounded measurement window', () => {
    const monitor = createPerfMonitor({ visible: false });
    monitor.record(100, { drawCalls: 12, geometries: 8, textures: 6 });
    monitor.record(180, { drawCalls: 12, geometries: 8, textures: 6 });

    monitor.reset();
    monitor.record(200, { drawCalls: 3, geometries: 2, textures: 1 });
    monitor.record(216, { drawCalls: 3, geometries: 2, textures: 1 });

    expect(monitor.snapshot()).toMatchObject({
      sampleCount: 1,
      medianFrameTimeMs: 16,
      slowFrameCount: 0,
      maxDrawCalls: 3,
      maxGeometries: 2,
      maxTextures: 1,
    });
    monitor.dispose();
  });
});
