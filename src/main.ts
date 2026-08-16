import './styles.css';
import { createAppController } from './ui/app-controller';
import { createFatalScreen } from './ui/screens';

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Missing #app mount point');

let app: ReturnType<typeof createAppController> | null = null;
try {
  app = createAppController(root);
} catch {
  root.replaceChildren(createFatalScreen('unknown'));
}

if (import.meta.hot) import.meta.hot.dispose(() => app?.destroy());
