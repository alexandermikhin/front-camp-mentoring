export class HttpService {
  async execute(type, url, body) {
    switch (type) {
      case 'get':
        return await this.get(url);
      case 'post':
        return await this.post(url, body);
      default:
        const request = new Request({
          method: type,
          url,
          body: JSON.stringify(body)
        });
        return this._executeFetch(request);
    }
  }

  async get(url) {
    const request = new Request(url);
    return this._executeFetch(request);
  }

  async post(url, body) {
    const request = new Request({
      method: 'POST',
      url,
      body: JSON.stringify(body)
    });

    return this._executeFetch(request);
  }

  async _executeFetch(request) {
    const response = await fetch(request);
    const json = await response.json();
    return response.ok ? Promise.resolve(json) : Promise.reject(json);
  }
}
