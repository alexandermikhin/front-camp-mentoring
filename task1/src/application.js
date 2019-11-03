import { NewsApiService } from './services/news-api.service';

export default class Application {
  constructor() {
    this._newsApiService = new NewsApiService();
    this._errorService = null;
    this._errorPopup = null;
  }

  run() {
    this._initHandlers();
    this._updateLayout();
  }

  /** @returns {HTMLSelectElement} */
  get _categoryElement() {
    return document.querySelector('#category');
  }

  /** @returns {HTMLSelectElement} */
  get _newsCountElement() {
    return document.querySelector('#news-count');
  }

  /** @returns {HTMLDivElement} */
  get _newsBlockElement() {
    return document.querySelector('#news-block');
  }

  async _fetchData() {
    const category = this._getCategory();
    const pageSize = this._getNewsCount();

    return await this._newsApiService
      .getNews({ category, pageSize })
      .catch(async error => {
        await this._initErrorService();
        await this._initErrorPopup();
        this._errorService.handleError(error.message);
      });
  }

  _getCategory() {
    return this._categoryElement.value;
  }

  _getNewsCount() {
    return this._newsCountElement.value;
  }

  _initHandlers() {
    this._categoryElement.onchange = () => this._updateLayout();
    this._newsCountElement.onchange = () => this._updateLayout();
  }

  async _initErrorService() {
    if (this._errorService) {
      return;
    }

    const module = await import('./services/error.service');
    this._errorService = module.ErrorService.getInstance();
    this._errorService.subscribe(error => this._errorPopup.show(error));
  }

  async _initErrorPopup() {
    if (this._errorPopup) {
      return;
    }

    const module = await import('./error-popup/error-popup.js');
    this._errorPopup = module.ErrorPopup.getInstance();
  }

  async _updateLayout() {
    const data = await this._fetchData();

    if (data && data.articles && data.articles.length > 0) {
      this._newsBlockElement.innerHTML = '';
      const articles = data.articles.filter(a => a.content);
      const newsHtml = articles.map(a => this._buildNewsHtml(a)).join('');
      this._newsBlockElement.innerHTML = newsHtml;
    }
  }

  _buildNewsHtml(article) {
    const publishDate = new Date(article.publishedAt);
    const imageHtml = article.urlToImage
      ? `<img class="news-item__image" src="${article.urlToImage}" />`
      : '';

    const textBlockMarginClass = article.urlToImage
      ? 'news-item-text-block_with-margin'
      : '';

    return `<div class="news-item">
          <h2 class="news-item__title">${article.title}</h2>
          <div class="news-item__publish-date">${publishDate.toLocaleString()}</div>
          <div class="news-item-content">
            ${imageHtml}
            <div class="news-item-text-block ${textBlockMarginClass}">
              <p class="news-item__text">${article.content}</p>
              <p class="news-item__url"><a href="${
                article.url
              }" target="_blank">More...</a></p>
            </div>
          </div>
      </div>`;
  }
}
