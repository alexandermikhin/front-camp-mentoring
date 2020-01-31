import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalNewsModel } from '../models/data-models/local-news.model';
import { UserService } from './user.service';

@Injectable()
export class LocalNewsService {
    private readonly API_URL = 'http://localhost:3000';

    constructor(
        private httpClient: HttpClient,
        private userServices: UserService
    ) {}

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
        const headers = this.getAuthHeaders();
        return this.httpClient.delete(`${this.API_URL}/news/${id}`, {
            headers
        });
    }

    createNews(item: LocalNewsModel): Observable<any> {
        return this.httpClient.post(`${this.API_URL}/news`, item);
    }

    editNews(item: LocalNewsModel): Observable<any> {
        const headers = this.getAuthHeaders();

        return this.httpClient.put(`${this.API_URL}/news/${item.id}`, item, {
            headers
        });
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

    private getAuthHeaders(): HttpHeaders {
        return new HttpHeaders({ 'x-auth-token': this.userServices.authToken });
    }
}
