const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const NewsService = require("./news.service");
const NewsDbService = require("./db/news-db.service");
const UserService = require("./db/user.service");
const logger = require("./logger");
const auth = require("./middleware/auth");
const passport = require('passport');
require("./passport");

const app = express();
const dataService = new NewsDbService();
const newsService = new NewsService(dataService);
const userService = new UserService();
const viewsPath = path.resolve(__dirname, "./views");

const url = "mongodb://localhost:27017";
const dbName = "news";
mongoose.connect(`${url}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.set("views", viewsPath);
app.set("view engine", "pug");
app.use(passport.initialize());
app.use(express.json());
app.post("/login", login);
app.post("/register", register);
app.post("/logout", logout);
app.use(commonMiddleware);
app.get("/news", getNews);
app.get("/news/:id", getNewsById);
app.use(express.json());
app.post("/news", createNewsItem);
app.use(auth);
app.delete("/news/:id", deleteNewsItem);
app.use(auth);
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
  const newItem = getItemFromBody(req.body);
  const validationResult = newsService.isValid(newItem);
  if (!validationResult[0]) {
    res.status(400).send(validationResult[1]);
    return;
  }

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
  const updatedItem = getItemFromBody(req.body);

  const validationResult = newsService.isValid(updatedItem);
  if (!validationResult[0]) {
    res.status(400).send(validationResult[1]);
    return;
  }

  try {
    await newsService.update(id, updatedItem);
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

async function login(req, res, next) {
  console.log('Request: Login');
  const body = req.body;
  const user = await userService.get(body.login);
  if (!user || user.password !== body.password) {
    res.status(400).send("User login or password is invalid");
    return;
  }

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    login: user.login
  });
}

async function register(req, res, next) {
  console.log('Request: Register');
  const body = req.body;
  const user = userService.get(body.login);
  if (user) {
    res.status(400).send("User already exists");
    return;
  }
  await userService.create(body.login, body.password);
  res.status(200).send({ login: body.login });
}

function logout(req, res, next) {
  console.log('Request: Logout');
  res.header("x-auth-token", null).send("Logged out.");
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

function getItemFromBody(body) {
  return {
    id: body.id,
    date: body.date,
    content: body.content,
    title: body.title,
    author: body.author
  };
}
