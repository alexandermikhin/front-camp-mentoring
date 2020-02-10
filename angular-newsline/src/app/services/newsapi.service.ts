import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    NewsApiRequestModel,
    NewsApiResponseModel,
    NewsApiSourcesModel
} from '../models';
import { NewsApiConfig, NewsApiInjectionToken } from './newsapi.config';

@Injectable()
export class NewsApiService {
    constructor(
        @Inject(NewsApiInjectionToken)
        private readonly newsApiConfig: NewsApiConfig,
        private httpClient: HttpClient
    ) {}

    getNews(
        q: string,
        source: string,
        page: number,
        pageSize: number = 5
    ): Observable<NewsApiResponseModel> {
        const url = this.getNewsUrl({
            apiKey: this.newsApiConfig.apiKey,
            q,
            page,
            pageSize,
            sources: source
        });

        return this.httpClient.get<NewsApiResponseModel>(url);
    }

    getSources(): Observable<NewsApiSourcesModel> {
        const url = `${this.newsApiConfig.apiUrl}/sources?apiKey=${this.newsApiConfig.apiKey}`;

        return this.httpClient.get<NewsApiSourcesModel>(url);
    }

    private getNewsUrl(params: NewsApiRequestModel): string {
        const url = `${this.newsApiConfig.apiUrl}/top-headlines`;
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
