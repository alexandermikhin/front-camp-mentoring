import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo(pageId?: string) {
        let url = browser.baseUrl;
        if (pageId) {
            url += `/details/${pageId}`;
        }

        return browser.get(url) as Promise<any>;
    }

    getTitleText(): Promise<string> {
        return element(
            by.css('nl-root .nl-header .nl-top-bar__logo-text')
        ).getText() as Promise<string>;
    }

    getNewsHeader(): Promise<string> {
        return element(by.css('.nl-header__header')).getText() as Promise<
            string
        >;
    }
}
