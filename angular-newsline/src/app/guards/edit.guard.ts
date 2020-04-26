import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LocalNewsService, UserService } from '../services';

@Injectable()
export class EditGuard implements CanActivate {
    constructor(
        private localNewsService: LocalNewsService,
        private userService: UserService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot) {
        const id = route.paramMap.get('id') || '';
        return zip(
            this.localNewsService.getNewsById(id),
            this.userService.activeUser
        ).pipe(
            map(
                ([newsItem, user]) =>
                    !!(newsItem && user && newsItem.author === user.login)
            ),
            tap(result => {
                if (!result) {
                    this.router.navigate(['/']);
                }
            })
        );
    }
}
