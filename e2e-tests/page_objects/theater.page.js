import Page from './page';

/** TheaterPage selenium page-object */
class TheaterPage extends Page {
    get tabContent() { return $('//ion-content[@id="tab-theaters"]'); }

    get homeTheaterTabButton() { return this.tabContent.$('#tab-button-theater'); }
    get homeTheaterTabDiv() { return this.homeTheaterTabButton.$('./div'); }
    get homeTheaterTabPane() { return this.tabContent.$('#tab-theaters'); }

    goToHomeTheaterTab() {
        this.homeTheaterTabDiv.waitForAnimation();
        this.homeTheaterTabButton.click();
    }

    isHomeTheaterTabSelected() {
        browser.waitUntil(() => this.homeTheaterTabButton.getAttribute('aria-selected') === 'true', 5000);
        this.homeTheaterTabPane.isDisplayed();
    }
}

module.exports = new TheaterPage('', '/theater');
