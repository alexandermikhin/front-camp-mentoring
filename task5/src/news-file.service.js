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

  async getAll(query) {
    const data = await this._getData();
    const news = this._filterData(data.news, query);
    return news;
  }

  async getById(id) {
    const data = await this._getData();
    return data.news.find(newsItem => newsItem.id === id);
  }

  async create(item) {
    const data = await this._getData();
    const newItem = {
      ...item,
      id: parseInt(data.availableId)
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
      throw new Error("No item found for update.");
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

  _filterData(news, query) {
    if (!query) {
      return news;
    }

    let filteredNews = news;
    if (query.q) {
      filteredNews = filteredNews.filter(
        i =>
          (i.heading && i.heading.includes(query.q)) ||
          (i.shortDescription && i.shortDescription.includes(query.q)) ||
          (i.content && i.content.includes(query.q))
      );
    }

    if (query.author) {
      filteredNews = filteredNews.filter(i => i.author === query.author);
    }

    if (query.sourceUrl) {
      filteredNews = filteredNews.filter(i => i.sourceUrl === query.sourceUrl);
    }

    filteredNews = this._limitNews(filteredNews, query);

    return filteredNews;
  }

  _limitNews(news, query) {
    const page = parseInt(query.page, 10);
    const pageSize = parseInt(query.pageSize, 10);

    if (!page || !pageSize) {
      return news;
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return news.slice(startIndex, endIndex);
  }
}

module.exports = NewsFileService;
