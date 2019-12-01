const mongoose = require("mongoose");
const NewsItem = require("./news-item.model");

const url = "mongodb://localhost:27017";
const dbName = "news";
mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true });

class NewsDbService {
  async getAll() {
    return NewsItem.find()
      .select({ _id: 0 })
      .then();
  }

  async getById(id) {
    return NewsItem.find({ id })
      .select({ _id: 0 })
      .then();
  }
}

module.exports = NewsDbService;
