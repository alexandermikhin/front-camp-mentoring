import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { LocalNewsModel, User } from 'src/app/models';
import { HeaderService, LocalNewsService, UserService } from 'src/app/services';
import { NewsDetailsContainerComponent } from './news-details-container.component';

describe('NewsDetailsContainerComponent', () => {
    let component: NewsDetailsContainerComponent;
    let fixture: ComponentFixture<NewsDetailsContainerComponent>;
    let userServiceStub: {
        activeUser: BehaviorSubject<User | undefined>;
    };
    let headerServiceSpyObj: jasmine.SpyObj<HeaderService>;
    let localNewsServiceSpyObj: jasmine.SpyObj<LocalNewsService>;
    let activatedRoute: ActivatedRoute;
    let userService: UserService;

    beforeEach(() => {
        userServiceStub = {
            activeUser: new BehaviorSubject(undefined)
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
        userService = TestBed.get(UserService);
    });

    it('should create component', () => {
        setupLocalNewsServiceReturnValue(getNewsItems());
        setupActivatedRouteReturnValue('news-id');
        fixture.detectChanges();
        expect(component).toBeDefined();
    });

    it('should set editable access rights for news item with active user as author', () => {
        const newsItems = getNewsItems();
        setupLocalNewsServiceReturnValue(newsItems);
        setupActivatedRouteReturnValue('news-id');
        userServiceStub.activeUser.next({ login: newsItems[0].author });
        fixture.detectChanges();
        if (component.model) {
            expect(component.model.isEditable).toBeTruthy();
        } else {
            fail('Component model was not initialized.');
        }
    });

    it('should set editable access rights for news item with active user as author', () => {
        setupLocalNewsServiceReturnValue(getNewsItems());
        setupActivatedRouteReturnValue('news-id');
        userServiceStub.activeUser.next({ login: 'active-user' });
        fixture.detectChanges();
        if (component.model) {
            expect(component.model.isEditable).toBeFalsy();
        } else {
            fail('Component model was not initialized.');
        }
    });

    it('should pass source url as a parameter to the local news service', () => {
        setupLocalNewsServiceReturnValue(getNewsItems());
        setupActivatedRouteReturnValue('news-source-url');
        fixture.detectChanges();
        expect(localNewsServiceSpyObj.getNews).toHaveBeenCalledWith({
            sourceUrl: 'news-source-url'
        });
    });

    it('should udpate header with news item heading', () => {
        setupLocalNewsServiceReturnValue(getNewsItems());
        setupActivatedRouteReturnValue('news-source-url');
        fixture.detectChanges();
        expect(headerServiceSpyObj.setHeader).toHaveBeenCalledWith(
            'news-item-heading'
        );
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
