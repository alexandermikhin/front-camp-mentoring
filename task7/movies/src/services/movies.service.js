export class MoviesService {
  constructor() {
    this._url = "https://reactjs-cdp.herokuapp.com";
  }

  async getMovies(params) {
    const request = new Request(this._getMoviesUrl(params));
    const response = await fetch(request);
    const data = await response.json();
    return data.data;
  }

  _getMoviesUrl(params) {
    const url = `${this._url}/movies`;
    if (!params) {
      return url;
    }

    const queryList = [];
    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key]) {
        queryList.push(`${key}=${params[key]}`);
      }
    }

    const query = queryList.join("&");

    return `${url}?${query}`;
  }
}
