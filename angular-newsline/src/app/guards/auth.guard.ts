import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }

    canActivate() {
        return this.userService.activeUser.pipe(map(u => !!u), tap(result => {
            if (!result) {
                this.router.navigate(['/']);
            }
        }));
    }
}
