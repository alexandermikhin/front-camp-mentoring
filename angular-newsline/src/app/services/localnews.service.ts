import { Injectable } from '@angular/core';
import { NewsItemModel } from '../models/news-item.model';

@Injectable()
export class LocalNewsService {
    private items: NewsItemModel[] = [];
    constructor() {
        this.generateItems();
    }

    getNews(q: string, author: string | undefined, page: number, pageSize: number = 5): NewsItemModel[] {
        let filteredNews = author !== undefined ? this.items.filter(i => i.author === author) : this.items;
        filteredNews = filteredNews.filter(i => i.heading.includes(q) ||
            i.shortDescription.includes(q) ||
            i.content.includes(q));

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredNews.slice(startIndex, endIndex);
    }

    private generateItems() {
        for (let i = 0; i < 10; i++) {
            this.items.push({
                id: i.toString(),
                heading: `Local news ${i} heading`,
                shortDescription: `Local news ${i} short description`,
                content: `Local news ${i} content`,
                date: new Date(),
                source: i % 2 === 0 ? 'CNN' : 'BBC',
                image: `Local news ${i} image url`,
                author: i % 2 === 0 ? 'admin' : 'user',
                sourceUrl: 'http://www.google.com'
            });
        }
    }
}
