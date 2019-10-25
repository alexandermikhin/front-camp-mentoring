import Application from './application';
import './styles/styles.scss';

main();

function main() {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new Application();
    app.run();
  });
}
