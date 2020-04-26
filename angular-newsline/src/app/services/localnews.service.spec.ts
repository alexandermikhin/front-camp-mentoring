import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LocalNewsModel, LocalNewsRequestModel } from '../models';
import { LocalNewsService } from './localnews.service';
import { UserService } from './user.service';

describe('LocalNewsService', () => {
    let service: LocalNewsService;
    let userService: Partial<UserService>;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        userService = {
            authToken: 'token'
        };
    });

    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                LocalNewsService,
                { provide: UserService, useValue: userService }
            ]
        })
    );

    beforeEach(() => {
        service = TestBed.get(LocalNewsService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get news', () => {
        const query: LocalNewsRequestModel = {
            q: 'query',
            page: 1,
            pageSize: 10
        };

        const expectedResponse: LocalNewsModel[] = [
            getLocalNewsModel(0),
            getLocalNewsModel(1)
        ];

        service.getNews(query).subscribe(response => {
            expect(response).toEqual(expectedResponse);
        });

        const request = httpTestingController.expectOne(
            'http://localhost:3000/news?q=query&page=1&pageSize=10'
        );
        expect(request.request.method).toEqual('GET');
        request.flush(expectedResponse);
    });

    it('should get news by id', () => {
        const newsId = 20;
        const expectedResponse: LocalNewsModel = getLocalNewsModel(newsId);

        service.getNewsById(newsId.toString()).subscribe(response => {
            expect(response).toEqual(expectedResponse);
        });

        const request = httpTestingController.expectOne(
            'http://localhost:3000/news/20'
        );
        expect(request.request.method).toEqual('GET');
        request.flush(expectedResponse);
    });

    it('should delete news item by id', () => {
        const newsId = 20;
        const expectedResponse: LocalNewsModel = getLocalNewsModel(newsId);

        service.deleteNews(newsId.toString()).subscribe(response => {
            expect(response).toEqual(expectedResponse);
        });

        const testRequest = httpTestingController.expectOne(
            'http://localhost:3000/news/20'
        );

        const { request } = testRequest;

        expect(request.method).toEqual('DELETE');
        expect(request.headers.has('x-auth-token')).toBeTruthy();
        expect(request.headers.get('x-auth-token')).toBe('token');
        testRequest.flush(expectedResponse);
    });

    it('should create news item', () => {
        const expectedResponse = 'ok';
        const newsItemToCreate = getLocalNewsModel(1);

        service.createNews(newsItemToCreate).subscribe(response => {
            expect(response).toEqual(expectedResponse);
        });

        const testRequest = httpTestingController.expectOne(
            'http://localhost:3000/news'
        );

        const { request } = testRequest;

        expect(request.method).toEqual('POST');
        expect(request.body).toEqual(newsItemToCreate);
        testRequest.flush(expectedResponse);
    });

    it('should edit news item', () => {
        const expectedResponse = 'ok';
        const newsItemToEdit = getLocalNewsModel(1);

        service.editNews(newsItemToEdit).subscribe(response => {
            expect(response).toEqual(expectedResponse);
        });

        const testRequest = httpTestingController.expectOne(
            'http://localhost:3000/news/1'
        );

        const { request } = testRequest;

        expect(request.method).toEqual('PUT');
        expect(request.body).toEqual(newsItemToEdit);
        expect(request.headers.has('x-auth-token')).toBeTruthy();
        expect(request.headers.get('x-auth-token')).toBe('token');
        testRequest.flush(expectedResponse);
    });

    function getLocalNewsModel(id: number): LocalNewsModel {
        return {
            id,
            heading: `news-${id}-heading`,
            shortDescription: `news-${id}-short-description`,
            content: `news-${id}-content`,
            date: '2020-02-08',
            author: `news-${id}-author`,
            sourceUrl: `news-${id}-source-url`
        };
    }
});
