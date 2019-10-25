import { API_KEY, API_URL } from './constants';

export class NewsApiService {
  async getNews(category) {
    const url = this._getUrl(category);
    const req = new Request(url);
    const response = await fetch(req);
    return response.json();
  }

  _getUrl(category) {
    return `${API_URL}?country=us&category=${category}&apiKey=${API_KEY}`;
  }
}
