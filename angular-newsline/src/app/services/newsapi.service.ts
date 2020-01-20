import { Injectable } from '@angular/core';
import { NewsItemModel } from '../models/news-item.model';

@Injectable()
export class NewsApiService {
    private items: NewsItemModel[] = [];
    constructor() {
        this.generateItems();
    }

    getNews(q: string, source: string, page: number, pageSize: number = 5): NewsItemModel[] {
        let filteredNews = source ? this.items.filter(i => i.source === source) : this.items;
        filteredNews = filteredNews.filter(i => i.heading.includes(q) ||
            i.shortDescription.includes(q) ||
            i.content.includes(q));

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredNews.slice(startIndex, endIndex);
    }

    getNewsById(id: string): NewsItemModel {
        return this.items.find(i => i.id === id);
    }

    getSources(): string[] {
        return ['CNN', 'BBC'];
    }

    private generateItems() {
        for (let i = 0; i < 1000; i++) {
            this.items.push({
                id: i.toString(),
                heading: `News ${i} heading`,
                shortDescription: `News ${i} short description`,
                content: `News ${i} content`,
                date: new Date(),
                source: i % 2 === 0 ? 'CNN' : 'BBC',
                image: `News ${i} image url`,
                author: 'Author',
                sourceUrl: 'http://www.google.com'
            });
        }
    }
}
