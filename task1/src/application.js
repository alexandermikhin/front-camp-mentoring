import { NewsApiService } from './news-api.service';

export default class Application {
  constructor() {
    this._service = new NewsApiService();
  }

  run() {
    this._initHandlers();
  }

  async _fetchData() {
    const category = this._getCategory();
    return await this._service.getNews(category);
  }

  _getCategory() {
    /** @type {HTMLSelectElement} */
    const element = document.querySelector('#category');
    return element.value;
  }

  _getNewsCount() {
    /** @type {HTMLSelectElement} */
    const element = document.querySelector('#news-count');
    return element.value;
  }

  _initHandlers() {
    /** @type {HTMLSelectElement} */
    const categoryElement = document.querySelector('#category');
    categoryElement.onchange = () => this._updateLayout();

    /** @type {HTMLSelectElement} */
    const countElement = document.querySelector('#news-count');
    countElement.onchange = () => this._updateLayout();
  }

  async _updateLayout() {
    const data = await this._fetchData();

    /** @type {HTMLDivElement} */
    const newsBlock = document.querySelector('#news-block');
    newsBlock.innerHTML = '';
    if (data.articles && data.articles.length > 0) {
      const newsCount = this._getNewsCount();
      const articles = data.articles.slice(0, newsCount);
      const newsHtml = articles.map(a => this._buildNewsHtml(a)).join('');
      newsBlock.innerHTML = newsHtml;
    }
  }

  _buildNewsHtml(article) {
    return `<div>
          <p>${article.title}</p>
          <img src="${article.urlToImage}" />
          <p>${article.content}</p>
      </div>`;
  }
}
