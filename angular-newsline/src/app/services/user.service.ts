import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class UserService {
    private user = new Subject<User | undefined>();

    private users: User[] = [
        { login: 'admin', password: 'admin' }
    ];

    get activeUser(): Observable<User | undefined> {
        return this.user.asObservable();
    }

    login(login: string, password: string): [boolean, string] {
        const user = this.users.find(u => u.login === login && u.password === password);
        this.user.next(user);
        return user ?
            [true, 'Success']
            : [false, 'User or password is incorrect'];
    }

    logout() {
        this.user.next(undefined);
    }

    register(login: string, password: string): [boolean, string] {
        const user = this.users.find(u => u.login === login);
        if (user) {
            return [false, 'User already exists'];
        }

        this.users.push({ login, password });
        this.user.next({ login, password });
        return [true, 'User added'];
    }
}
