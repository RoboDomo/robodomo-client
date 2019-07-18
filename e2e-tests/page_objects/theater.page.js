/* eslint max-len: ['error', { 'ignoreComments': true, 'ignoreStrings': true, 'ignoreTrailingComments': true }] */
/* eslint lines-between-class-members: ["error", "always", { exceptAfterSingleLine: true }] */
/* eslint class-methods-use-this: [0] */

import Page from './page';

/** TheaterPage selenium page-object */
class TheaterPage extends Page {
    get pageContent() { return $('//div[contains(@class, "ion-page")]'); }

    get homeTheaterTabButton() { return $('#theater-tabs-tab-theater'); }
    get homeTheaterTabPane() { return $('#theater-tabs-tabpane-theater'); }

    goToHomeTheaterTab() { this.homeTheaterTabButton.click(); }

    isHomeTheaterTabSelected() {
        browser.waitUntil(() => this.homeTheaterTabButton.getAttribute('aria-selected') === 'true', 5000);
        this.homeTheaterTabPane.isDisplayed();
    }
}

module.exports = new TheaterPage('', '/theater');
