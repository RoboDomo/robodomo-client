import Page from './page';

/** NestPage selenium page-object */
class NestPage extends Page {
    get hallwayTabButton() { return $('//*[@id="tab-button-hallwaythermostat"]'); }

    get entrywayTabButton() { return $('//*[@id="tab-button-entrywaynestprotect"]'); }

    goToHallwayTab() {
        this.hallwayTabButton.click();
    }

    goToEntrywayTab() {
        this.entrywayTabButton.click();
    }

    isHallwayTabSelected() {
        browser.waitUntil(() => this.hallwayTabButton.getAttribute('aria-selected') === 'true', 5000);
    }

    isEntrywayTabSelected() {
        browser.waitUntil(() => this.entrywayTabButton.getAttribute('aria-selected') === 'true', 5000);
    }
}

module.exports = new NestPage('', '/nest');
