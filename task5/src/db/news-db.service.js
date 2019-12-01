const NewsItem = require("./news-item.model");
const AvailableId = require("./available-ids.model");

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
    ).exec();
  }

  async delete(id) {
    NewsItem.deleteOne({ id }).exec();
  }

  async update(id, item) {
    const result = await NewsItem.updateOne(
      { id },
      {
        title: item.title,
        author: item.author,
        date: new Date(item.date),
        content: item.content
      }
    ).then();

    if (result.n === 0) {
      throw new Error("No item found for update.");
    }
  }
}

module.exports = NewsDbService;
