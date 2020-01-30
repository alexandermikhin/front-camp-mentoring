import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'nl-login-popup',
    templateUrl: './login-popup.component.html',
    styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent {
    @Input() errorMessage: string;
    @Output() login = new EventEmitter<[string, string]>();
    @Output() register = new EventEmitter<[string, string]>();
    @Output() cancel = new EventEmitter();

    onSubmit(login: string, password: string) {
        this.login.emit([login, password]);
    }

    onRegister(login: string, password: string) {
        this.register.emit([login, password]);
    }

    onCancel() {
        this.cancel.emit();
    }
}
