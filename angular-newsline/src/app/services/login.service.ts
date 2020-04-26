import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { LoginPopupComponent } from '../components/login-popup/login-popup.component';
import { UserService } from './user.service';

export type PopupElement = NgElement & WithProperties<LoginPopupComponent>;

@Injectable()
export class LoginService {
    constructor(private userService: UserService) {}

    showPopup() {
        const popupEl: PopupElement = document.createElement(
            'login-popup'
        ) as any;

        popupEl.addEventListener(
            'login',
            (event: CustomEvent<[string, string]>) =>
                this.login(event.detail[0], event.detail[1], popupEl)
        );

        popupEl.addEventListener(
            'register',
            (event: CustomEvent<[string, string]>) => {
                this.userService
                    .register(event.detail[0], event.detail[1])
                    .subscribe(
                        () =>
                            this.login(
                                event.detail[0],
                                event.detail[1],
                                popupEl
                            ),
                        (response: HttpErrorResponse) =>
                            (popupEl.errorMessage = response.error)
                    );
            }
        );

        popupEl.addEventListener('cancel', () => {
            this.hidePopup(popupEl);
        });

        document.body.appendChild(popupEl);
    }

    private hidePopup(element: PopupElement) {
        document.body.removeChild(element);
    }

    private login(login: string, password: string, popupEl: PopupElement) {
        this.userService.login(login, password).subscribe(
            () => this.hidePopup(popupEl),
            () => (popupEl.errorMessage = 'User or password is incorrect')
        );
    }
}
