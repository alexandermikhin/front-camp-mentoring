import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { LocalNewsService } from '../services/localnews.service';
import { UserService } from '../services/user.service';

@Injectable()
export class EditGuard implements CanActivate {
    constructor(
        private localNewsService: LocalNewsService,
        private userService: UserService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot) {
        const id = route.paramMap.get('id');
        const newsItem = this.localNewsService.getNewsById(id);
        return this.userService.activeUser.pipe(map(user =>
            !!(newsItem && user && newsItem.author === user.login))
            , tap(result => {
                if (!result) {
                    this.router.navigate(['/']);
                }
            }));
    }
}
