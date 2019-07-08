// theater.page.js
import Page from './page';
import MenuComponent from './menu.component';

class TheaterPage extends Page {

    get pageContent() { return $('//div[contains(@class, "ion-page")]') }

    get homeTheaterTabButton() { return $('#theater-tabs-tab-theater') }
    get homeTheaterTabPane() { return $('#theater-tabs-tabpane-theater') }

    goToHomeTheaterTab() {
        this.homeTheaterTabButton.click();
    }

    isHomeTheaterTabSelected() {
        browser.waitUntil(() => {
            return this.homeTheaterTabButton.getAttribute('aria-selected') === "true";
        }, 5000);
        this.homeTheaterTabPane.isDisplayed()
    }
}

module.exports = new TheaterPage('', '/theater');
