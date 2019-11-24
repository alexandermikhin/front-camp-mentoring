const express = require("express");
const newsService = require('./news.service');
const logger = require('./logger');

const app = express();

app.use((req, _res, next) => {
  logger.log('info', `URL: ${req.url}`);
  next();
});

app.get("/news", (_req, res) => {
  console.log('Request: Get all news.');
  const news = newsService.getAll();
  res.send(news);
});

app.get("/news/:id", (req, res) => {
  console.log('Request: Get news item by id.');
  const id = parseInt(req.params.id);
  const newsItem = newsService.getById(id);
  if (newsItem) {
    res.send(newsItem);
  } else {
    res.status(404).send();
  }
});

app.use(express.json());

app.post("/news", (req, res) => {
  console.log('Request: Create news item.');
  const body = req.body;
  const newItem = {
    id: -1,
    date: body.date,
    content: body.content
  };

  const addedItem = newsService.add(newItem);
  if (addedItem) {
    res.status(201).send();
  } else {
    res.status(500).send('Error adding a new item.');
  }
});

app.delete("/news/:id", (req, res) => {
  console.log('Request: Delete news item.');
  const id = parseInt(req.params.id);
  const deletedItem = newsService.delete(id);
  if (deletedItem) {
    res.status(200).send();
  } else {
    res.status(500).send('Error deleting the item.');
  }
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
