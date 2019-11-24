const data = require("./data/news.json");

class NewsService {
  getAll() {
    return data.news;
  }

  getById(id) {
    return data.news.find(newsItem => newsItem.id === id);
  }

  add(item) {
    const maxIdItem = data.news.reduce((acc, val) =>
      acc.id > val.id ? acc : val
    );
    const newItem = {
      id: maxIdItem.id + 1,
      date: item.date,
      content: item.content
    };

    data.news.push(newItem);
    return newItem;
  }

  delete(id) {
    const index = data.news.findIndex(newsItem => newsItem.id === id);
    if (index !== -1) {
      return data.news.splice(index, 1);
    }

    return null;
  }
}

const newsSevice = new NewsService();

module.exports = newsSevice;
