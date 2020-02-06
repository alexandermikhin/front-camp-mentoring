import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LocalNewsService } from './localnews.service';
import { UserService } from './user.service';

describe('LocalNewsService', () => {
    let service: LocalNewsService;
    let userService: Partial<UserService>;

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
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
