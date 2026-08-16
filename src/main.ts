import './styles.css';
import { createAppController } from './ui/app-controller';
import { createFatalScreen } from './ui/screens';

declare global {
  interface Window {
    __HANZI_GLIDER_E2E__?: NonNullable<ReturnType<typeof createAppController>['testHook']>;
  }
}

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Missing #app mount point');

let app: ReturnType<typeof createAppController> | null = null;
try {
  app = createAppController(root);
  if (app.testHook) window.__HANZI_GLIDER_E2E__ = app.testHook;
} catch {
  root.replaceChildren(createFatalScreen('unknown'));
}

if (import.meta.hot) import.meta.hot.dispose(() => {
  delete window.__HANZI_GLIDER_E2E__;
  app?.destroy();
});
