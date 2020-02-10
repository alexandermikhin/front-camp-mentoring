import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NewsApiResponseModel } from '../models';
import { NewsApiConfig, NewsApiInjectionToken } from './newsapi.config';
import { NewsApiService } from './newsapi.service';

describe('NewsApiService', () => {
    let service: NewsApiService;
    let httpTestingController: HttpTestingController;
    const config: NewsApiConfig = {
        apiKey: 'api-key',
        apiUrl: 'api-url'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                NewsApiService,
                { provide: NewsApiInjectionToken, useValue: config }
            ]
        });
    });

    beforeEach(() => {
        service = TestBed.get(NewsApiService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get news', () => {
        const expectedResponse: NewsApiResponseModel = {
            articles: [],
            status: 'ok',
            totalResults: 0
        };

        service.getNews('q', 'source', 1, 10).subscribe(response => {
            expect(response).toEqual(expectedResponse);
        });

        const testRequest = httpTestingController.expectOne(
            `${config.apiUrl}/top-headlines?apiKey=${config.apiKey}&q=q&page=1&pageSize=10&sources=source`
        );
        const { request } = testRequest;
        expect(request.method).toBe('GET');
        testRequest.flush(expectedResponse);
    });
});
