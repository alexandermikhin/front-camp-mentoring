import { API_KEY, API_URL } from './constants';

export class NewsApiService {
  async getNews(parameters) {
    const url = this._getUrl(parameters);
    const req = new Request(url);
    const response = await fetch(req);
    return response.json();
  }

  _getUrl(parameters) {
    const categoryQuery = this._getQuery('category', parameters.category);
    const pageSize = this._getQuery('pageSize', parameters.pageSize)
    return `${API_URL}?country=us${categoryQuery}${pageSize}&apiKey=${API_KEY}`;
  }

  _getQuery(key, value) {
    return value ? `&${key}=${value}` : '';
  }
}
