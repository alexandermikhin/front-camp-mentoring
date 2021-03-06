import { ErrorService } from '../services/error.service';

export class NewsListController {
  constructor(model, view) {
    this._model = model;
    this._view = view;
    this.errorService = ErrorService.getInstance();
    this._category = 'business';
    this._pageSize = 5;
    this._initViewHandler();
    this._initErrorHanlder();
  }

  async updateView() {
    const data = await this._model.fetchData(this._category, this._pageSize);
    this.onDataChanged(data);
  }

  onDataChanged(data) {
    if (data && data.articles && data.articles.length > 0) {
      const articles = data.articles.filter(a => a.content);
      this._view.updateLayout(articles);
    }
  }

  _initViewHandler() {
    this._view.selectionChangedHandler = ({ category, pageSize }) => {
      this._category = category;
      this._pageSize = pageSize;
      this.updateView();
    };
  }

  _initErrorHanlder() {
    this.errorService.subscribe(error => this._view.showError(error));
  }
}
