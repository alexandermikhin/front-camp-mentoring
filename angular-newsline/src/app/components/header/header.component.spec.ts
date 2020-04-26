import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of, Subject } from 'rxjs';
import { User } from 'src/app/models';
import { HeaderService, LoginService, UserService } from 'src/app/services';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let userServiceStub: {
        activeUser: Subject<User>;
        logout: () => Observable<null>;
    };
    let loginService: jasmine.SpyObj<LoginService>;
    let headerServiceStub: {
        activeHeader: Subject<string>;
    };

    beforeEach(() => {
        userServiceStub = {
            activeUser: new Subject(),
            logout: () => of(null)
        };
        loginService = jasmine.createSpyObj<LoginService>('LoginService', [
            'showPopup'
        ]);
        headerServiceStub = {
            activeHeader: new Subject()
        };
    });

    beforeEach(() =>
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            providers: [
                { provide: UserService, useValue: userServiceStub },
                { provide: LoginService, useValue: loginService },
                { provide: HeaderService, useValue: headerServiceStub }
            ]
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
    });

    it('should create component', () => {
        fixture.detectChanges();
        expect(component).toBeDefined();
    });

    it('should display logged in user name', () => {
        fixture.detectChanges();
        const user: User = { login: 'user-name' };
        userServiceStub.activeUser.next(user);
        fixture.detectChanges();
        const loginDebugEl = fixture.debugElement.query(
            By.css('.nl-top-bar__login')
        );

        const loginElement: HTMLSpanElement = loginDebugEl.nativeElement;
        expect(loginElement.innerText).toEqual('user-name');
    });

    it('should display active header', () => {
        fixture.detectChanges();
        const header = 'app-header';
        headerServiceStub.activeHeader.next(header);
        fixture.detectChanges();
        const headerDebugEl = fixture.debugElement.query(
            By.css('.nl-header__header')
        );

        const headerElement: HTMLSpanElement = headerDebugEl.nativeElement;
        expect(headerElement.innerText).toEqual(header);
    });

    it('should call to show login popup on login click', () => {
        fixture.detectChanges();
        const loginButtonDebugEl = fixture.debugElement.query(
            By.css('.nl-top-bar__login-button')
        );
        loginButtonDebugEl.triggerEventHandler('click', null);
        expect(loginService.showPopup).toHaveBeenCalled();
    });

    it('show trigger logout on logout click', () => {
        const userService: UserService = TestBed.get(UserService);
        spyOn(userService, 'logout').and.callThrough();
        fixture.detectChanges();
        const user: User = { login: 'user' };
        userServiceStub.activeUser.next(user);
        fixture.detectChanges();
        const logoutButtonDebugEl = fixture.debugElement.query(
            By.css('.nl-top-bar__login-button')
        );
        logoutButtonDebugEl.triggerEventHandler('click', null);
        expect(userService.logout).toHaveBeenCalled();
    });
});
