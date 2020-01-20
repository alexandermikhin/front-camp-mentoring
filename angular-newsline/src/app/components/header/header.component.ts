import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'nl-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    private subscrption = new Subscription();

    userName: string | undefined;
    sourceName = 'Source name';
    errorMessage: string;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.subscrption.add(this.userService.activeUser.subscribe(u => this.userName = u && u.login));
    }

    ngOnDestroy() {
        this.subscrption.unsubscribe();
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
