import { expect, it, vi } from 'vitest';
import { createGlyphTexture } from '../../src/render/glyph-texture';

it('draws an opaque dark plate and centered white CJK glyph into a 512 by 256 canvas', () => {
  const colors: string[] = [];
  const context = {
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    font: '',
    textAlign: '',
    textBaseline: '',
    set fillStyle(value: string) { colors.push(value); },
  } as unknown as CanvasRenderingContext2D;
  const getContext = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context);
  try {
    const texture = createGlyphTexture('爱');
    const canvas = texture.image as HTMLCanvasElement;
    expect([canvas.width, canvas.height]).toEqual([512, 256]);
    expect(colors).toEqual(['#13233e', '#ffffff']);
    expect(context.fillRect).toHaveBeenCalledWith(0, 0, 512, 256);
    expect(context.fillText).toHaveBeenCalledWith('爱', 256, 131, 476);
    expect(context.font).toContain('Noto Sans CJK SC');
    texture.dispose();
  } finally {
    getContext.mockRestore();
  }
});

it('fails clearly when no 2D canvas context is available', () => {
  const getContext = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
  try {
    expect(() => createGlyphTexture('爱')).toThrow('2D canvas is unavailable');
  } finally {
    getContext.mockRestore();
  }
});
