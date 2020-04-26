import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
    let router: Router;

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
        router = TestBed.get(Router);
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

    it('should call deleteNews and navigate home on news delete', () => {
        spyOn(router, 'navigate');
        const newsDetailsDebugEl = fixture.debugElement.query(
            By.css('nl-news-details')
        );
        newsDetailsDebugEl.triggerEventHandler('delete', 'news-id');
        expect(localNewsServiceSpyObj.deleteNews).toHaveBeenCalledWith(
            'news-id'
        );
        expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should navigate to edit page on news edit', () => {
        spyOn(router, 'navigate');
        const newsDetailsDebugEl = fixture.debugElement.query(
            By.css('nl-news-details')
        );
        newsDetailsDebugEl.triggerEventHandler('edit', 'news-id');
        expect(router.navigate).toHaveBeenCalledWith(['/edit', 'news-id']);
    });

    it('should handle empty values right', () => {
        setupLocalNewsServiceReturnValue([]);
        setupActivatedRouteReturnValue(null);
        fixture.detectChanges();
        expect(localNewsServiceSpyObj.getNews).toHaveBeenCalledWith({
            sourceUrl: undefined
        });
        expect(component.model).toBeUndefined();
        expect(headerServiceSpyObj.setHeader).toHaveBeenCalledWith('');
    });

    function setupLocalNewsServiceReturnValue(items: LocalNewsModel[]) {
        localNewsServiceSpyObj.getNews.and.returnValue(of(items));
    }

    function setupActivatedRouteReturnValue(
        newsId: string | null
    ): jasmine.Spy {
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
