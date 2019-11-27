const express = require("express");
const path = require('path');
const NewsService = require("./news.service");
const NewsFileService = require("./news-file.service");
const logger = require("./logger");

const app = express();
const dataService = new NewsFileService();
const newsService = new NewsService(dataService);
const viewsPath = path.resolve(__dirname, "./views");

app.set("views", viewsPath);
app.set("view engine", "pug");

app.use(commonMiddleware);
app.get("/news", getNews);
app.get("/news/:id", getNewsById);
app.use(express.json());
app.post("/news", createNewsItem);
app.delete("/news/:id", deleteNewsItem);
app.put("/news/:id", updateNewsItem);
app.all("*", otherMethodsHandler);
app.use(errorLogHandler);
app.use(errorHanlder);

module.exports = app;

function commonMiddleware(req, _res, next) {
  logger.log("info", `URL: ${req.url}`);
  next();
}

async function getNews(_req, res, next) {
  console.log("Request: Get all news.");
  try {
    const news = await newsService.getAll();
    res.send(news);
  } catch (e) {
    next(e);
  }
}

async function getNewsById(req, res, next) {
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
}

async function createNewsItem(req, res, next) {
  console.log("Request: Create news item.");
  const body = req.body;
  const newItem = {
    id: -1,
    date: body.date,
    content: body.content
  };

  try {
    await newsService.add(newItem);
    res.status(200).send("News add successful.");
  } catch (err) {
    next(err);
  }
}

async function deleteNewsItem(req, res, next) {
  console.log("Request: Delete news item.");
  const id = parseInt(req.params.id);
  try {
    await newsService.delete(id);
    res.status(200).send("News delete successful.");
  } catch (e) {
    next(e);
  }
}

async function updateNewsItem(req, res, next) {
  console.log("Request: Update news item.");
  const id = parseInt(req.params.id);
  const body = req.body;
  const updatedItem = {
    id,
    date: body.date,
    content: body.content
  };

  try {
    await newsService.update(updatedItem);
    res.status(200).send();
  } catch (e) {
    next(e);
  }
}

async function otherMethodsHandler(_req, res, next) {
  try {
    const news = await newsService.getAll();
    res.send(news);
  } catch (e) {
    next(e);
  }
}

function errorLogHandler(err, _req, _res, next) {
  if (err) {
    logger.log("error", "Application error: ", err);
    next(err);
  }
}

function errorHanlder(err, _req, res, _next) {
  if (err) {
    res.status(500);
    res.render("error", { message: err.message });
  }
}