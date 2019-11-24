const express = require("express");
const data = require("./data/news.json");
const app = express();

app.get("/news", (_req, res) => {
  res.send(data.news);
});

app.get("/news/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newsItem = data.news.find(newsItem => newsItem.id === id);
  if (newsItem) {
    res.send(newsItem);
  } else {
    res.status(404).send();
  }
});

app.use(express.json());

app.post("/news", (req, res) => {
  const body = req.body;
  const maxIdItem = data.news.reduce((acc, val) => acc.id > val.id ? acc : val);
  const newItem = {
    id: maxIdItem.id + 1,
    date: body.date,
    content: body.content
  };
  
  data.news.push(newItem);
  res.status(201).send();
});

app.delete("/news/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.news.findIndex(newsItem => newsItem.id === id);
  if (index !== -1) {
    data.news.splice(index, 1);
  }

  res.status(200).send();
});

app.all("*", (_req, res) => {
  res.send(data);
});

app.use((err, _req, res, _next) => {
  if (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => {
  console.log("Application started on port 3000.");
});
