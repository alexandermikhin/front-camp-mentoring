const fs = require("fs");
const util = require('util');

readFileAsync = util.promisify(fs.readFile);
writeFileAsync = util.promisify(fs.writeFile);

class NewsFileService {
    async getAll() {
        const content = await readFileAsync('./data/news.json', 'utf-8');
        const data = JSON.parse(content);
        return data.news;
    }

    async getById(id) {
        const content = await readFileAsync('./data/news.json', 'utf-8');
        const data = JSON.parse(content);
        return data.news.find(newsItem => newsItem.id === id);
    }
}

module.exports = NewsFileService;