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

  async delete(id) {
    this._service.delete(id);
  }
}

module.exports = NewsService;
