import Page from './page';

/** DashboardPage selenium page-object */
class WeatherPage extends Page {
    get sDTabButton() { return $('#tab-button-92109'); }
    get sDTabPane() { return $('//ion-content//div[@class="ion-page"][contains(.,"San Diego")]'); }

    get nYTabButton() { return $('#tab-button-10001'); }
    get nYTabPane() { return $('//ion-content//div[@class="ion-page"][contains(.,"New York")]'); }

    goToSDTab() {
        this.sDTabButton.click();
    }

    goToNYTab() {
        this.nYTabButton.click();
    }

    isSDTabSelected() {
        browser.waitUntil(() => this.sDTabButton.getAttribute('aria-selected') === 'true', 5000);
        this.sDTabPane.isDisplayed();
    }

    isNYTabSelected() {
        browser.waitUntil(() => this.nYTabButton.getAttribute('aria-selected') === 'true', 5000);
        this.nYTabPane.isDisplayed();
    }
}

module.exports = new WeatherPage('', '/weather');
