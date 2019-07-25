import Page from './page';

/** TheaterPage selenium page-object */
class TheaterPage extends Page {
    get pageContent() { return $('//div[contains(@class, "ion-page")]'); }

    get homeTheaterTabButton() { return $('#tab-button-theater'); }
    get homeTheaterTabPane() { return $('#tab-theaters'); }

    goToHomeTheaterTab() {
        this.homeTheaterTabButton.click();
    }

    isHomeTheaterTabSelected() {
        browser.waitUntil(() => this.homeTheaterTabButton.getAttribute('aria-selected') === 'true', 5000);
        this.homeTheaterTabPane.isDisplayed();
    }
}

module.exports = new TheaterPage('', '/theater');
