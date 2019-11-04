import './news-list.view.scss';

export class NewsListView {
  constructor() {
    this._selectionChangedHandler = null;
    this._errorPopup = null;
    this._buildBasicLayout();
    this._initHandlers();
  }

  get selectionChangedHandler() {
    return this._selectionChangedHandler;
  }

  set selectionChangedHandler(handler) {
    this._selectionChangedHandler = handler;
  }

  updateLayout(model) {
    this._updateCategory(model.category);
    this._updateNewsCount(model.pageSize);
    this._udpateNewsBlock(model.articles);
  }

  selectionChanged() {
    const category = this._getCategory();
    const pageSize = this._getNewsCount();
    this.selectionChangedHandler({ category, pageSize });
  }

  async showError(message) {
    await this._initErrorPopup();
    this._errorPopup.show(message);
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

  _getCategory() {
    return this._categoryElement.value;
  }

  _getNewsCount() {
    return this._newsCountElement.value;
  }

  _initHandlers() {
    this._categoryElement.onchange = () => this.selectionChanged();
    this._newsCountElement.onchange = () => this.selectionChanged();
  }

  _buildArticleHtml(article) {
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

  _buildBasicLayout() {
    const content = document.querySelector('#content');
    content.innerHTML = `
      <h1 class="app-title">NewsAPI top news</h1>
      <div class="settings">
        <div class="settings-item">
          <label>Category:</label>&nbsp;
          <select id="category" class="setting-input">
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </div>
        <div class="settings-item">
          <label>Show:</label>&nbsp;
          <select id="news-count" class="setting-input">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="200">200</option>
          </select>
        </div>
      </div>
      <div class="news-block" id="news-block"></div>
    `;
  }

  async _initErrorPopup() {
    if (this._errorPopup) {
      return;
    }

    const module = await import('../error-popup/error-popup.js');
    this._errorPopup = module.ErrorPopup.getInstance();
  }

  _udpateNewsBlock(articles) {
    this._newsBlockElement.innerHTML = '';
    const newsHtml = articles.map(a => this._buildArticleHtml(a)).join('');
    this._newsBlockElement.innerHTML = newsHtml;
  }

  _updateCategory(category) {
    this._categoryElement.value = category;
  }

  _updateNewsCount(newsCount) {
    this._newsCountElement.value = newsCount;
  }
}
