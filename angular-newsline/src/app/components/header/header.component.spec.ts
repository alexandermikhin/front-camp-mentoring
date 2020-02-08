import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of, Subject } from 'rxjs';
import { User } from 'src/app/models';
import { HeaderService, LoginService, UserService } from 'src/app/services';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let userService: {
        activeUser: Subject<User>;
        logout: () => Observable<null>;
    };
    let loginService: jasmine.SpyObj<LoginService>;
    let headerService: {
        activeHeader: Subject<string>;
    };

    beforeEach(() => {
        userService = {
            activeUser: new Subject(),
            logout: () => of(null)
        };
        loginService = jasmine.createSpyObj<LoginService>('LoginService', [
            'showPopup'
        ]);
        headerService = {
            activeHeader: new Subject()
        };
    });

    beforeEach(() =>
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            providers: [
                { provide: UserService, useValue: userService },
                { provide: LoginService, useValue: loginService },
                { provide: HeaderService, useValue: headerService }
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
        userService.activeUser.next(user);
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
        headerService.activeHeader.next(header);
        fixture.detectChanges();
        const headerDebugEl = fixture.debugElement.query(
            By.css('.nl-header__header')
        );

        const headerElement: HTMLSpanElement = headerDebugEl.nativeElement;
        expect(headerElement.innerText).toEqual(header);
    });
});
