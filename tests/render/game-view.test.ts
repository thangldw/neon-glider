import * as THREE from 'three';
import { expect, it, vi } from 'vitest';
import { createGameView, type RendererLike } from '../../src/render/game-view';

function rendererFixture(): RendererLike {
  return {
    domElement: document.createElement('canvas'),
    setPixelRatio: vi.fn(),
    setSize: vi.fn(),
    render: vi.fn(),
    setAnimationLoop: vi.fn(),
    dispose: vi.fn(),
    forceContextLoss: vi.fn(),
  };
}

function containerFixture(): HTMLDivElement {
  const container = document.createElement('div');
  Object.defineProperties(container, {
    clientWidth: { value: 360 },
    clientHeight: { value: 240 },
  });
  return container;
}

it('renders only while active and releases its canvas resources on disposal', () => {
  const renderer = rendererFixture();
  const view = createGameView(containerFixture(), { createRenderer: () => renderer });
  view.setLane(2);
  view.render(1);
  view.setPaused(true);
  view.render(2);
  view.dispose();
  view.dispose();

  expect(renderer.render).toHaveBeenCalledOnce();
  expect(renderer.setPixelRatio).toHaveBeenCalledWith(expect.any(Number));
  expect(renderer.setAnimationLoop).toHaveBeenCalledWith(null);
  expect(renderer.dispose).toHaveBeenCalledOnce();
  expect(renderer.forceContextLoss).toHaveBeenCalledOnce();
});

it('disposes the prior term textures before replacing gate labels', () => {
  const textures: THREE.Texture[] = [];
  const view = createGameView(containerFixture(), {
    createRenderer: rendererFixture,
    createGlyphTexture: () => {
      const texture = new THREE.Texture();
      texture.dispose = vi.fn();
      textures.push(texture);
      return texture;
    },
  });

  view.setGateTerms(['爱', '人', '书']);
  view.setGateTerms(['好', '水', '山']);
  for (const texture of textures.slice(0, 3)) expect(texture.dispose).toHaveBeenCalledOnce();
  view.dispose();
});
