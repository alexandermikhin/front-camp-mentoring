// @flow
export class MoviesService {
  _url = "https://reactjs-cdp.herokuapp.com";

  async getMovies(params: { [key: string]: string }) {
    const request = new Request(this._getMoviesUrl(params));
    const response = await fetch(request);
    const data = await response.json();
    return data.data;
  }

  async getById(id: string) {
    const request = new Request(`${this._url}/movies/${id}`);
    const response = await fetch(request);
    return response.json();
  }

  _getMoviesUrl(params: { [key: string]: string }): string {
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
