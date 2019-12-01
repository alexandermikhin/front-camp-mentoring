class NewsService {
  constructor(dataService) {
    this._dataService = dataService;
  }

  get _service() {
    if (!this._dataService) {
      throw new Error("Data service is not initialized.");
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
    try {
      const validationResult = this.isValid(item);
      if (!validationResult[0]) {
        throw new Error(validationResult[1]);
      }

      await this._service.create(item);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async delete(id) {
    try {
      await this._service.delete(id);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async update(item) {
    try {
      const validationResult = this.isValid(item);
      if (!validationResult[0]) {
        throw new Error(validationResult[1]);
      }

      await this._service.update(item);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  isValid(item) {
    if (!item) {
      return [false, "No news body."];
    }
  
    if (!item.date || !Date.parse(item.date)) {
      return [false, "No news date or date is invalid."];
    }
  
    if (!item.content) {
      return [false, "News content is absent or empty."];
    }

    if (!item.title) {
      return [false, "News title is absent or empty."];
    }

    return [true, ''];
  }
}

module.exports = NewsService;
