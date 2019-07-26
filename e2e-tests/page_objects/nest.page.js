import Page from './page';

/** NestPage selenium page-object */
class NestPage extends Page {
    get tabContent() { return $('//ion-content[@id="tab-nest"]'); }

    get hallwayTabButton() { return this.tabContent.$('.//*[@id="tab-button-hallwaythermostat"]'); }
    get hallwayTabDiv() { return this.hallwayTabButton.$('./div'); }
    get entrywayTabButton() { return this.tabContent.$('.//*[@id="tab-button-entrywaynestprotect"]'); }
    get entrywayTabDiv() { return this.entrywayTabButton.$('./div'); }

    goToHallwayTab() {
        this.hallwayTabDiv.waitForAnimation();
        this.hallwayTabButton.click();
    }

    goToEntrywayTab() {
        this.entrywayTabDiv.waitForAnimation();
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
