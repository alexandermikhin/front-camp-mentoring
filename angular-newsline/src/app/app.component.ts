import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { LoginPopupComponent } from './components/login-popup/login-popup.component';

@Component({
    selector: 'nl-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(injector: Injector) {
        const LoginPopupElement = createCustomElement(LoginPopupComponent, {
            injector
        });

        customElements.define('login-popup', LoginPopupElement);
    }
}
