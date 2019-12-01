const fs = require("fs");
const util = require("util");
const path = require("path");

readFileAsync = util.promisify(fs.readFile);
writeFileAsync = util.promisify(fs.writeFile);

class NewsFileService {
  constructor() {
    this._filePath = path.resolve(__dirname, "../data/news.json");
    this._encoding = "utf-8";
  }

  async getAll() {
    const data = await this._getData();
    return data.news;
  }

  async getById(id) {
    const data = await this._getData();
    return data.news.find(newsItem => newsItem.id === id);
  }

  async create(item) {
    const data = await this._getData();
    const newItem = {
      id: parseInt(data.availableId),
      date: item.date,
      content: item.content
    };

    data.news.push(newItem);
    const updatedData = {
      ...data,
      availableId: data.availableId + 1
    };

    this._writeData(updatedData);
  }

  async delete(id) {
    const data = await this._getData();
    const index = data.news.findIndex(newsItem => newsItem.id === id);
    if (index !== -1) {
      data.news.splice(index, 1);
      this._writeData(data);
    }
  }

  async update(id, item) {
    const data = await this._getData();
    const updateItemIndex = data.news.findIndex(newsItem => newsItem.id === id);
    if (updateItemIndex === -1) {
      throw new Error('No item found for update.');
    }

    data.news[updateItemIndex] = {
      ...item,
      id
    };

    this._writeData(data);
  }

  async _getData() {
    const content = await readFileAsync(this._filePath, this._encoding);
    return JSON.parse(content);
  }

  async _writeData(data) {
    await writeFileAsync(this._filePath, JSON.stringify(data, null, "  "));
  }
}

module.exports = NewsFileService;
