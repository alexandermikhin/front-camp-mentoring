import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalNewsModel } from '../models/data-models/local-news.model';

@Injectable()
export class LocalNewsService {
    private readonly API_URL = 'http://localhost:3000';

    constructor(private httpClient: HttpClient) {}

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

    getNewsById(id: string): Observable<LocalNewsModel> {
        const url = `${this.API_URL}/news/${id}`;

        return this.httpClient.get<LocalNewsModel>(url);
    }

    deleteNews(id: string): Observable<any> {
        return this.httpClient.delete(`${this.API_URL}/news/${id}`);
    }

    createNews(item: LocalNewsModel): Observable<any> {
        return this.httpClient.post(`${this.API_URL}/news`, item);
    }

    editNews(item: LocalNewsModel): Observable<any> {
        return this.httpClient.put(`${this.API_URL}/news/${item.id}`, item);
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
                (i.heading && i.heading.includes(q)) ||
                (i.shortDescription && i.shortDescription.includes(q)) ||
                (i.content && i.content.includes(q))
        );

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredNews.slice(startIndex, endIndex);
    }
}
