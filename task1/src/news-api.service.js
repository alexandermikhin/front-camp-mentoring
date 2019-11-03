import { API_KEY, API_URL } from './constants';
import { HttpService } from './services/http.service';

export class NewsApiService {
  constructor() {
    this._httpService = new HttpService();
  }

  async getNews(parameters) {
    const url = this._getUrl(parameters);
    return this._httpService.execute('get', url);
  }

  _getUrl(parameters) {
    const categoryQuery = this._getQuery('category', parameters.category);
    const pageSize = this._getQuery('pageSize', parameters.pageSize);
    return `${API_URL}?country=us${categoryQuery}${pageSize}&apiKey=${API_KEY}`;
  }

  _getQuery(key, value) {
    return value ? `&${key}=${value}` : '';
  }
}
