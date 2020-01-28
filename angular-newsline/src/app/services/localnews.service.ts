import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalNewsModel } from '../models/data-models/local-news.model';
import { NewsItemModel } from '../models/news-item.model';

@Injectable()
export class LocalNewsService {
    private items: NewsItemModel[] = [];

    private readonly API_URL = 'http://localhost:3000';
    constructor(private httpClient: HttpClient) {
        this.generateItems();
    }

    getNews(
        q: string,
        author: string | undefined,
        page: number,
        pageSize: number = 5
    ): Observable<LocalNewsModel[]> {
        const url = `${this.API_URL}/news`;

        return this.httpClient
            .get<LocalNewsModel[]>(url)
            .pipe(
                map(items =>
                    this.getFilteredItems(items, q, author, page, pageSize)
                )
            );
    }

    getNewsById(id: string): NewsItemModel {
        return this.items.find(i => i.id === id);
    }

    deleteNews(id: string) {
        this.items = this.items.filter(i => i.id !== id);
    }

    editNews(item: NewsItemModel) {
        if (!item.id) {
            const itemToModify = { ...item };
            const latestItem = this.items[this.items.length - 1];
            const newId = (latestItem && parseInt(latestItem.id, 10) + 1) || 1;
            itemToModify.id = newId.toString();
            this.items.push(itemToModify);
        } else {
            const index = this.items.findIndex(i => i.id === item.id);
            if (index !== -1) {
                this.items[index] = item;
            }
        }
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
                image: `/assets/news-logo.png`,
                author: i % 2 === 0 ? 'admin' : 'user',
                sourceUrl: 'http://www.google.com'
            });
        }
    }

    private getFilteredItems(
        items: LocalNewsModel[],
        q: string,
        author: string | undefined,
        page: number,
        pageSize: number
    ): LocalNewsModel[] {
        let filteredNews =
            author !== undefined
                ? items.filter(i => i.author === author)
                : items;
        filteredNews = filteredNews.filter(
            i =>
                i.heading.includes(q) ||
                i.shortDescription.includes(q) ||
                i.content.includes(q)
        );

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredNews.slice(startIndex, endIndex);
    }
}
