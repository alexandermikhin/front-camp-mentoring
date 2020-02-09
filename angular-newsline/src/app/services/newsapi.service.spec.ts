import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NewsApiService } from './newsapi.service';
import { NewsApiRequestModel } from '../models';

describe('NewsApiService', () => {
    let service: NewsApiService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [NewsApiService]
        });
    });

    beforeEach(() => {
        service = TestBed.get(NewsApiService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
