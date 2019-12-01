const mongoose = require("mongoose");

const newsItemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  date: Date,
  author: String,
  content: String
});

const NewsItem = mongoose.model("news", newsItemSchema);

module.exports = NewsItem;
