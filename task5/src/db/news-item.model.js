const mongoose = require("mongoose");

const newsItemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  date: Date,
  author: String,
  content: String
});

const NewsItem = mongoose.model("NewsItem", newsItemSchema, 'news');

module.exports = NewsItem;
