import { NewsApiService } from './news-api.service';

export default class Application {
  constructor() {
    this._service = new NewsApiService();
  }

  run() {
    this._initHandlers();
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
    return await this._service.getNews(category);
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

  async _updateLayout() {
    const data = await this._fetchData();

    this._newsBlockElement.innerHTML = '';
    if (data.articles && data.articles.length > 0) {
      const newsCount = this._getNewsCount();
      const articles = data.articles.filter(a => a.content).slice(0, newsCount);
      const newsHtml = articles.map(a => this._buildNewsHtml(a)).join('');
      this._newsBlockElement.innerHTML = newsHtml;
    }
  }

  _buildNewsHtml(article) {
    return `<div class="news-item">
          <h2>${article.title}</h2>
          <img class="news-item__image" src="${article.urlToImage}" />
          <p>${article.content}</p>
      </div>`;
  }
}
