const fs = require("fs");
const util = require("util");
const path = require("path");

readFileAsync = util.promisify(fs.readFile);
writeFileAsync = util.promisify(fs.writeFile);

class UserFileService {
  constructor() {
    this._filePath = path.resolve(__dirname, "../data/users.json");
    this._encoding = "utf-8";
  }

  async get(login) {
    const data = await this._getData();
    return data.find(user => user.login === login);
  }

  async create(login, password) {
    const data = await this._getData();
    data.push({ login, password });
    this._writeData(data);
  }

  async _getData() {
    const content = await readFileAsync(this._filePath, this._encoding);
    return JSON.parse(content);
  }

  async _writeData(data) {
    await writeFileAsync(this._filePath, JSON.stringify(data, null, "  "));
  }
}

module.exports = UserFileService;
