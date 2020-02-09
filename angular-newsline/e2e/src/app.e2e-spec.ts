import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('Newsline', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display app title', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('NL');
    });

    it('should display news page', () => {
        page.navigateTo('local-news-0-heading');
        expect(page.getNewsHeader()).not.toEqual('All');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser
            .manage()
            .logs()
            .get(logging.Type.BROWSER);
        expect(logs).not.toContain(
            jasmine.objectContaining({
                level: logging.Level.SEVERE
            } as logging.Entry)
        );
    });
});
