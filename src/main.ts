import './styles.css';

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Missing #app mount point');
root.textContent = 'Hanzi Glider';
