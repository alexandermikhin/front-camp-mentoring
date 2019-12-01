const mongoose = require("mongoose");
const NewsItem = require("./news-item.model");
const AvailableId = require("./available-ids.model");

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
    return NewsItem.findOne({ id })
      .select({ _id: 0 })
      .then();
  }

  async create(item) {
    const idItem = await AvailableId.findOne({ schema: "news" }).then();

    const newItem = {
      id: idItem.id,
      date: new Date(item.date),
      content: item.content,
      title: item.title,
      author: item.author
    };

    await NewsItem.create(newItem);

    await AvailableId.findOneAndUpdate(
      { schema: "news" },
      { id: idItem.id + 1 }
    ).then();
  }
}

module.exports = NewsDbService;
