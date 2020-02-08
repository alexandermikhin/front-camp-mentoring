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
