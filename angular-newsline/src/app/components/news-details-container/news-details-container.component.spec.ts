import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject } from 'rxjs';
import { LocalNewsModel, User } from 'src/app/models';
import { HeaderService, LocalNewsService, UserService } from 'src/app/services';
import { NewsDetailsContainerComponent } from './news-details-container.component';

fdescribe('NewsDetailsContainerComponent', () => {
    let component: NewsDetailsContainerComponent;
    let fixture: ComponentFixture<NewsDetailsContainerComponent>;
    let userServiceStub: {
        activeUser: Subject<User>;
    };
    let headerServiceSpyObj: jasmine.SpyObj<HeaderService>;
    let localNewsServiceSpyObj: jasmine.SpyObj<LocalNewsService>;
    let activatedRoute: ActivatedRoute;

    beforeEach(() => {
        userServiceStub = {
            activeUser: new Subject()
        };

        headerServiceSpyObj = jasmine.createSpyObj<HeaderService>(
            'HeaderService',
            ['setHeader']
        );

        localNewsServiceSpyObj = jasmine.createSpyObj<LocalNewsService>(
            'LocalNewsService',
            ['getNews', 'deleteNews']
        );

        activatedRoute = new ActivatedRoute();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [NewsDetailsContainerComponent],
            providers: [
                { provide: UserService, useValue: userServiceStub },
                { provide: HeaderService, useValue: headerServiceSpyObj },
                { provide: ActivatedRoute, useValue: activatedRoute },
                { provide: LocalNewsService, useValue: localNewsServiceSpyObj }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NewsDetailsContainerComponent);
        component = fixture.componentInstance;
    });

    it('should create component', () => {
        setupLocalNewsServiceReturnValue(getNewsItems());
        setupActivatedRouteReturnValue('news-id');
        fixture.detectChanges();
        expect(component).toBeDefined();
    });

    function setupLocalNewsServiceReturnValue(items: LocalNewsModel[]) {
        localNewsServiceSpyObj.getNews.and.returnValue(of(items));
    }

    function setupActivatedRouteReturnValue(newsId: string): jasmine.Spy {
        return spyOnProperty(activatedRoute, 'paramMap').and.returnValue(
            of(new Map([['id', newsId]]))
        );
    }

    function getNewsItems(): LocalNewsModel[] {
        return [
            {
                id: 0,
                heading: 'news-item-heading',
                shortDescription: 'news-item-short-description',
                content: 'news-item-content',
                date: '2020-02-09',
                author: 'news-item-author',
                sourceUrl: 'news-item-source-url'
            }
        ];
    }
});
