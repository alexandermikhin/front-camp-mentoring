import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponseModel } from '../models/login-response.model';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    private user = new BehaviorSubject<User | undefined>(undefined);
    private readonly API_URL = 'http://localhost:3000';

    constructor(private httpClient: HttpClient) {}

    get activeUser(): Observable<User | undefined> {
        return this.user.asObservable();
    }

    login(login: string, password: string): Observable<LoginResponseModel> {
        return this.httpClient
            .post<LoginResponseModel>(`${this.API_URL}/login`, {
                login,
                password
            })
            .pipe(
                tap(response => {
                    this.user.next({ login: response.user });
                })
            );
    }

    logout() {
        this.user.next(undefined);
    }

    register(login: string, password: string): Observable<any> {
        return this.httpClient.post(`${this.API_URL}/register`, {
            login,
            password
        });
    }
}
