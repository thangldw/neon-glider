import * as THREE from 'three';

const WIDTH = 512;
const HEIGHT = 256;

export function createGlyphTexture(term: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('2D canvas is unavailable for gate glyphs');

  context.clearRect(0, 0, WIDTH, HEIGHT);
  context.fillStyle = '#ffffff';
  context.font = '700 104px "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(term, WIDTH / 2, HEIGHT / 2 + 3, WIDTH - 36);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
