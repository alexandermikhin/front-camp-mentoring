import { NewsApiService } from './services/news-api.service';
import { NewsListModel } from './news-list/news-list.model';
import { NewsListController } from './news-list/news-list.controller';
import { NewsListView } from './news-list/news-list.view';

export default class Application {
  constructor() {
    this._newsApiService = new NewsApiService();
    this._errorService = null;
    this._errorPopup = null;
  }

  run() {
    const model = new NewsListModel(this._newsApiService);
    const view = new NewsListView();
    const controller = new NewsListController(model, view);
    controller.updateView();
  }
}
