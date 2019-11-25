const express = require("express");
const NewsService = require("./news.service");
const NewsFileService = require("./news-file.service");
const logger = require("./logger");

const app = express();
const dataService = new NewsFileService();
const newsService = new NewsService(dataService);

app.set("views", "./src/views");
app.set("view engine", "pug");

app.use((req, _res, next) => {
  logger.log("info", `URL: ${req.url}`);
  next();
});

app.get("/news", async (_req, res, next) => {
  console.log("Request: Get all news.");
  try {
    const news = await newsService.getAll();
    res.send(news);
  } catch (e) {
    next(e);
  }
});

app.get("/news/:id", async (req, res, next) => {
  console.log("Request: Get news item by id.");
  const id = parseInt(req.params.id);
  try {
    const newsItem = await newsService.getById(id);
    if (newsItem) {
      res.send(newsItem);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
});

app.use(express.json());

app.post("/news", async (req, res, next) => {
  console.log("Request: Create news item.");
  const body = req.body;
  const newItem = {
    id: -1,
    date: body.date,
    content: body.content
  };

  try {
    await newsService.add(newItem);
    res.status(200).send();
  } catch (err) {
    next(err);
  }
});

app.delete("/news/:id", async (req, res, next) => {
  console.log("Request: Delete news item.");
  const id = parseInt(req.params.id);
  try {
    await newsService.delete(id);
    res.status(200).send();
  } catch (e) {
    next(e);
  }
});

app.all("*", (_req, res, next) => {
  newsService
    .getAll()
    .then(news => {
      res.send(news);
    })
    .catch(err => {
      next(err);
    });
});

app.use((err, _req, res, _next) => {
  if (err) {
    res.status(500);
    res.render("error", { message: err.message });
  }
});

app.listen(3000, () => {
  console.log("Application started on port 3000.");
});
