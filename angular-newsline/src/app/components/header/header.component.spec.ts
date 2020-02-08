import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { HeaderService, LoginService, UserService } from 'src/app/services';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let userService: Partial<UserService>;
    let loginService: jasmine.SpyObj<LoginService>;
    let headerService: Partial<HeaderService>;

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
});
