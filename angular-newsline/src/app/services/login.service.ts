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
            (event: CustomEvent<[string, string]>) => {
                this.userService
                    .login(event.detail[0], event.detail[1])
                    .subscribe(
                        () => this.hidePopup(popupEl),
                        () =>
                            (popupEl.errorMessage =
                                'User or password is incorrect')
                    );
            }
        );

        popupEl.addEventListener(
            'register',
            (event: CustomEvent<[string, string]>) => {
                const result = this.userService.register(
                    event.detail[0],
                    event.detail[1]
                );
                popupEl.errorMessage = result[0] ? '' : result[1];
                if (result[0]) {
                    this.hidePopup(popupEl);
                }
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
}
