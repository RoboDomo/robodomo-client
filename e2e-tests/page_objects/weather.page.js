import Page from './page';

/** DashboardPage selenium page-object */
class WeatherPage extends Page {
    get lATabButton() { return $('//ion-label[text()="Los Angeles, CA"]/parent::ion-tab-button'); }
    get lATabPane() { return $('//ion-content//div[@class="ion-page"][contains(.,"San Diego")]'); }

    get nYTabButton() { return $('//ion-label[text()="New York, NY"]/parent::ion-tab-button'); }
    get nYTabPane() { return $('//ion-content//div[@class="ion-page"][contains(.,""New York")]'); }

    goToLATab() {
        this.lATabButton.click();
    }

    goToNYTab() {
        this.nYTabButton.click();
    }

    isLATabSelected() {
        browser.waitUntil(() => this.lATabButton.getAttribute('aria-selected') === 'true', 5000);
        this.lATabPane.isDisplayed();
    }

    isNYTabSelected() {
        browser.waitUntil(() => this.nYTabButton.getAttribute('aria-selected') === 'true', 5000);
        this.nYTabPane.isDisplayed();
    }
}

module.exports = new WeatherPage('', '/weather');
