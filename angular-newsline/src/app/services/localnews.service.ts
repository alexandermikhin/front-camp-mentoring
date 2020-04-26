import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalNewsModel, LocalNewsRequestModel } from '../models';
import { UserService } from './user.service';

@Injectable()
export class LocalNewsService {
    private readonly API_URL = 'http://localhost:3000';

    constructor(
        private httpClient: HttpClient,
        private userServices: UserService
    ) {}

    getNews(request: LocalNewsRequestModel): Observable<LocalNewsModel[]> {
        const url = this.getNewsUrl(request);

        return this.httpClient.get<LocalNewsModel[]>(url);
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

    private getAuthHeaders(): HttpHeaders {
        return new HttpHeaders({ 'x-auth-token': this.userServices.authToken });
    }

    private getNewsUrl(queryParams: LocalNewsRequestModel): string {
        let url = `${this.API_URL}/news`;

        queryParams.pageSize = queryParams.pageSize || 5;
        const queryList: string[] = [];
        for (const key in queryParams) {
            if (queryParams.hasOwnProperty(key) && queryParams[key]) {
                queryList.push(`${key}=${queryParams[key]}`);
            }
        }

        const query = queryList.join('&');
        if (query) {
            url += `?${query}`;
        }

        return url;
    }
}
