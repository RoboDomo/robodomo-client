import Page from './page';

/** NestPage selenium page-object */
class NestPage extends Page {
    get pageContent() { return $('//div[contains(@class, "ion-page")]'); }

    get hallwayTabButton() { return $('//*[@id="nest-tabs-tab-Entryway Nest Protect"]'); }
    get hallwayTabPane() { return $('//*[@id="nest-tabs-tabpane-Entryway Nest Protect"]'); }

    get entrywayTabButton() { return $('//*[@id="nest-tabs-tab-Hallway Thermostat"]'); }
    get entrywayTabPane() { return $('//*[@id="nest-tabs-tabpane-Hallway Thermostat"]'); }

    goToHallwayTab() {
        this.hallwayTabButton.click();
    }

    goToEntrywayTab() {
        this.entrywayTabButton.click();
    }

    isHallwayTabSelected() {
        browser.waitUntil(() => this.hallwayTabButton.getAttribute('aria-selected') === 'true', 5000);
        this.hallwayTabPane.isDisplayed();
    }

    isEntrywayTabSelected() {
        browser.waitUntil(() => this.entrywayTabButton.getAttribute('aria-selected') === 'true', 5000);
        this.entrywayTabPane.isDisplayed();
    }
}

module.exports = new NestPage('', '/nest');
