export class NewsListModel {
  constructor(newsApiService) {
    this._newsApiService = newsApiService;
    this._errorService = null;
  }

  async fetchData(category, pageSize) {
    return await this._newsApiService
      .getNews({ category, pageSize })
      .catch(async error => {
        await this._initErrorService();
        this._errorService.handleError(error.message);
      });
  }

  async _initErrorService() {
    if (this._errorService) {
      return;
    }

    const module = await import('../services/error.service');
    this._errorService = module.ErrorService.getInstance();
  }
}
