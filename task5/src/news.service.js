class NewsService {

  constructor(dataService) {
    this._dataService = dataService;
  }

  get _service() {
    if (!this._dataService) {
      throw new Error('Data service is not initialized.');
    }

    return this._dataService;
  }

  async getAll() {
    return this._service.getAll();
  }

  async getById(id) {
    return this._service.getById(id);
  }

  async add(item) {
    this._service.create(item);
  }

  delete(id) {
    const index = data.news.findIndex(newsItem => newsItem.id === id);
    if (index !== -1) {
      return data.news.splice(index, 1);
    }

    return null;
  }
}

module.exports = NewsService;
