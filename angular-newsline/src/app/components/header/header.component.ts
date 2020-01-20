import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { HeaderService } from 'src/app/services/header.service';

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
        private headerService: HeaderService) { }

    ngOnInit() {
        this.subscription.add(this.userService.activeUser.subscribe(u => this.userName = u && u.login));
        this.subscription.add(this.headerService.activeHeader.subscribe(h => this.header = h || ''));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    login(login: string, password: string) {
        const result = this.userService.login(login, password);
        this.errorMessage = result[0] ? '' : result[1];
    }

    register(login: string, password: string) {
        const result = this.userService.register(login, password);
        this.errorMessage = result[0] ? '' : result[1];
    }

    logout() {
        this.userService.logout();
    }
}
