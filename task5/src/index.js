const app = require("./app");

run();

function run() {
  app.listen(3000, () => {
    console.log("Application started on port 3000.");
  });
}
