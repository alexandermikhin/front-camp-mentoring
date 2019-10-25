import Application from './application';

main();

function main() {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new Application();
    app.run();
  });
}
