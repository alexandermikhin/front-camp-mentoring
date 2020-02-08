import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    getTitleText() {
        return element(
            by.css('nl-root .nl-header .nl-top-bar__logo-text')
        ).getText() as Promise<string>;
    }
}
