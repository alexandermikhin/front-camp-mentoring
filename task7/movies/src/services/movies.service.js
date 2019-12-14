export class MoviesService {
    constructor() {
        this._url = 'https://reactjs-cdp.herokuapp.com'
    }

    async getMovies() {
        const request = new Request(`${this._url}/movies`);
        const response = await fetch(request);
        const data = await response.json();
        debugger;
        return data.data;
    }
}