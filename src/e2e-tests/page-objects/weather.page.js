// weather.page.js
import Page from './page';
import MenuComponent from './menu.component';

class WeatherPage extends Page {

    get pageContent() { return $('//div[contains(@class, "ion-page")]') }

    get lATabButton() { return $('//*[@id="weather-tabs-tab-Los Angeles, CA"]') }
    get lATabPane() { return $('//*[@id="weather-tabs-tabpane-Los Angeles, CA"]') }

    get nYTabButton() { return $('//*[@id="weather-tabs-tab-New York, NY"]') }
    get nYTabPane() { return $('//*[@id="weather-tabs-tabpane-New York, NY"]') }

    goToLATab() {
        this.lATabButton.click();
    }

    goToNYTab() {
        this.nYTabButton.click();
    }

    isLATabSelected() {
        browser.waitUntil(() => {
            return this.lATabButton.getAttribute('aria-selected') === "true";
        }, 5000);
        this.lATabPane.isDisplayed()
    }

    isNYTabSelected() {
        browser.waitUntil(() => {
            return this.nYTabButton.getAttribute('aria-selected') === "true";
        }, 5000);
        this.nYTabPane.isDisplayed()
    }
}

module.exports = new WeatherPage('', '/weather');
