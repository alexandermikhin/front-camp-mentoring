const express = require("express");
const news = require("./data/news.json");
const app = express();

app.all("*", (_req, res) => {
  res.send(news);
});

app.use((err, _req, res, _next) => {
  if (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => {
  console.log("Application started on port 3000.");
});
