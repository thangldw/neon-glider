// The package's maintained regular-font export is CSS-only and ships no TypeScript declaration.
// @ts-expect-error CSS side-effect import is resolved by Vite.
import '@phosphor-icons/web/regular';
import './styles.css';
import { createAppController } from './ui/app-controller';
import { createWebGLFatalScreen } from './ui/screens';

declare global {
  interface Window {
    __NEON_GLIDER_E2E__?: NonNullable<ReturnType<typeof createAppController>['test']>;
    /** Compile-only bridge until Task 6 removes the superseded browser suite. */
    __HANZI_GLIDER_E2E__?: {
      snapshot(): {
        screen: any;
        run: any;
        choices: null | readonly { id: string; term: string }[];
        questionDurationMs: number;
        reducedMotion: boolean;
        performance: any;
        framing: any;
      };
      answer(selectedId: string): boolean;
      resetPerformance(): void;
    };
  }
}

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Missing #app mount point');

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
