/* eslint max-len: ['error', { 'ignoreComments': true, 'ignoreStrings': true, 'ignoreTrailingComments': true }] */
/* eslint lines-between-class-members: ["error", "always", { exceptAfterSingleLine: true }] */
/* eslint class-methods-use-this: [0] */
import Page from './page';

/** DashboardPage selenium page-object */
class WeatherPage extends Page {
    get pageContent() { return $('//div[contains(@class, "ion-page")]'); }

    get lATabButton() { return $('//*[@id="weather-tabs-tab-Los Angeles, CA"]'); }
    get lATabPane() { return $('//*[@id="weather-tabs-tabpane-Los Angeles, CA"]'); }

    get nYTabButton() { return $('//*[@id="weather-tabs-tab-New York, NY"]'); }
    get nYTabPane() { return $('//*[@id="weather-tabs-tabpane-New York, NY"]'); }

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
