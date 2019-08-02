import Page from './page';

/** DashboardPage selenium page-object */
class WeatherPage extends Page {
    get tabContent() { return $('//ion-content[@id="tab-weather"]'); }

    get sDTabButton() { return this.tabContent.$('#tab-button-92109'); }
    get sDTabDiv() { return this.sDTabButton.$('./div'); }
    get sDTabPane() { return this.tabContent.$('.//ion-content//div[@class="ion-page"][contains(.,"San Diego")]'); }

    get nYTabButton() { return this.tabContent.$('#tab-button-10001'); }
    get nYTabDiv() { return this.nYTabButton.$('./div'); }
    get nYTabPane() { return this.tabContent.$('.//ion-content//div[@class="ion-page"][contains(.,"New York")]'); }

    goToSDTab() {
        if (this.sDTabButton.getAttribute('aria-selected') !== 'true') {
            this.sDTabDiv.waitForAnimation();
            this.sDTabButton.click();
        }
    }

    goToNYTab() {
        if (this.nYTabButton.getAttribute('aria-selected') !== 'true') {
            this.nYTabDiv.waitForAnimation();
            this.nYTabButton.click();
        }
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
