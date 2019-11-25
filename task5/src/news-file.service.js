const fs = require("fs");
const util = require("util");

readFileAsync = util.promisify(fs.readFile);
writeFileAsync = util.promisify(fs.writeFile);

class NewsFileService {
  constructor() {
    this._filePath = "./data/news.json";
    this._encoding = "utf-8";
  }

  async getAll() {
    const content = await readFileAsync(this._filePath, this._encoding);
    const data = JSON.parse(content);
    return data.news;
  }

  async getById(id) {
    const content = await readFileAsync(this._filePath, this._encoding);
    const data = JSON.parse(content);
    return data.news.find(newsItem => newsItem.id === id);
  }

  async create(item) {
    const content = await readFileAsync(this._filePath, this._encoding);
    const data = JSON.parse(content);
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

    await writeFileAsync(
      this._filePath,
      JSON.stringify(updatedData, null, " ")
    );
  }
}

module.exports = NewsFileService;
