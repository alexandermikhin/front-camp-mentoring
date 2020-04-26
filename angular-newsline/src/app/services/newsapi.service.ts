import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    NewsApiRequestModel,
    NewsApiResponseModel,
    NewsApiSourcesModel
} from '../models';

@Injectable()
export class NewsApiService {
    private readonly API_KEY = 'D7d93d013b914df292f2f135562b7514';
    private readonly API_URL = 'https://newsapi.org/v2';

    constructor(private httpClient: HttpClient) {}

    getNews(
        q: string,
        source: string,
        page: number,
        pageSize: number = 5
    ): Observable<NewsApiResponseModel> {
        const url = this.getNewsUrl({
            apiKey: this.API_KEY,
            q,
            page,
            pageSize,
            sources: source
        });

        return this.httpClient.get<NewsApiResponseModel>(url);
    }

    getSources(): Observable<NewsApiSourcesModel> {
        const url = `${this.API_URL}/sources?apiKey=${this.API_KEY}`;

        return this.httpClient.get<NewsApiSourcesModel>(url);
    }

    private getNewsUrl(params: NewsApiRequestModel): string {
        const url = `${this.API_URL}/top-headlines`;
        const queryParams: NewsApiRequestModel = { ...params };
        if (
            !queryParams.category &&
            !queryParams.country &&
            !queryParams.sources
        ) {
            queryParams.category = 'general';
        }

        const queryList: string[] = [];
        for (const key in queryParams) {
            if (queryParams.hasOwnProperty(key) && queryParams[key]) {
                queryList.push(`${key}=${queryParams[key]}`);
            }
        }

        const query = queryList.join('&');

        return `${url}?${query}`;
    }
}
