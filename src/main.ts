// The package's maintained regular-font export is CSS-only and ships no TypeScript declaration.
// @ts-expect-error CSS side-effect import is resolved by Vite.
import '@phosphor-icons/web/regular';
import './styles.css';
import { clearLegacyLearningKeys } from './storage/legacy-cleanup';
import { createAppController } from './ui/app-controller';
import { createWebGLFatalScreen } from './ui/screens';

declare global {
  interface Window {
    __NEON_GLIDER_E2E__?: NonNullable<ReturnType<typeof createAppController>['test']>;
  }
}

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Missing #app mount point');

clearLegacyLearningKeys(
  () => window.sessionStorage,
  () => window.localStorage,
);

let app: ReturnType<typeof createAppController> | null = null;
try {
  app = createAppController(root);
  if (app.test) window.__NEON_GLIDER_E2E__ = app.test;
} catch {
  root.replaceChildren(createWebGLFatalScreen());
}

if (import.meta.hot) import.meta.hot.dispose(() => {
  delete window.__NEON_GLIDER_E2E__;
  app?.destroy();
});
