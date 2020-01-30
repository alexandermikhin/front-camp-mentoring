import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'nl-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    private subscription = new Subscription();

    userName: string | undefined;
    header = '';
    errorMessage: string;

    constructor(
        private userService: UserService,
        private loginService: LoginService,
        private headerService: HeaderService
    ) {}

    ngOnInit() {
        this.subscription.add(
            this.userService.activeUser.subscribe(
                u => (this.userName = u && u.login)
            )
        );
        this.subscription.add(
            this.headerService.activeHeader.subscribe(
                h => (this.header = h || '')
            )
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    showLoginPopup() {
        this.loginService.showPopup();
    }

    logout() {
        this.userService.logout();
    }
}
