import expect from 'expect';
import Page from './page';

/** DashboardPage selenium page-object */
class DashboardPage extends Page {
    get tabContent() { return $('//ion-content[@id="tab-dashboard"]'); }

    get bedroomTabButton() { return this.tabContent.$('.//ion-tab-button[@id="tab-button-bedroom"]'); }
    get bedroomTabDiv() { return this.bedroomTabButton.$('./div'); }
    get theaterTabButton() { return this.tabContent.$('.//ion-tab-button[@id="tab-button-theater"]'); }
    get theaterTabDiv() { return this.theaterTabButton.$('./div'); }

    get bedroomNestCell() { return this.tabContent.$('.//form/parent::div/parent::ion-card-content'); }
    get bedroomNestDecreaseButton() { return this.tabContent.$('.//form//button[1]'); }
    get bedroomNestTemperatureValue() { return this.tabContent.$('.//form//input'); }
    get bedroomNestIncreaseButton() { return this.tabContent.$('.//form//button[2]'); }

    get theaterCeilingFanLightButton() { return this.tabContent.$('.//ion-card[contains(.,"Ceiling Fan Light")]/parent::div'); }
    get theaterCeilingFanLightDiv() { return this.theaterCeilingFanLightButton.$('./parent::div'); }
    get theaterNestCell() { return this.tabContent.$('.//form/parent::div/parent::ion-card-content'); }
    get theaterNestDecreaseButton() { return this.tabContent.$('.//form//button[1]'); }
    get theaterNestTemperatureValue() { return this.tabContent.$('.//form//input'); }
    get theaterNestIncreaseButton() { return this.tabContent.$('.//form//button[2]'); }

    goToBedroomTab() {
        this.bedroomTabDiv.waitForAnimation();
        this.bedroomTabButton.click();
    }

    goToTheaterTab() {
        this.theaterTabDiv.waitForAnimation();
        this.theaterTabButton.click();
    }

    isBedroomTabSelected() {
        browser.waitUntil(() => this.bedroomTabButton.getAttribute('aria-selected') === 'true', 5000);
    }

    isTheaterTabSelected() {
        browser.waitUntil(() => this.theaterTabButton.getAttribute('aria-selected') === 'true', 5000);
    }

    validateTabButtonsScreenshots() {
        browser.checkElement(this.bedroomTabButton, 'DashboardPage_bedroomTabButton');
        this.goToBedroomTab();
        browser.checkElement(this.bedroomTabButton, 'DashboardPage_bedroomTabButton_Active');

        browser.checkElement(this.theaterTabButton, 'DashboardPage_theaterTabButton');
        this.goToTheaterTab();
        browser.checkElement(this.theaterTabButton, 'DashboardPage_theaterTabButton_Active');
    }

    validateBedroomNestScreenshots() {
        let i = 0;
        while (parseInt(this.bedroomNestTemperatureValue.getProperty('value'), 0) !== 77 && i < 100) {
            if (parseInt(this.bedroomNestTemperatureValue.getProperty('value'), 0) < 77) {
                this.bedroomNestIncreaseButton.click();
                browser.pause(1000);
            }
            if (parseInt(this.bedroomNestTemperatureValue.getProperty('value'), 0) > 77) {
                this.bedroomNestDecreaseButton.click();
                browser.pause(1000);
            }
            i += 1;
        }

        expect(browser.checkElement(this.bedroomNestCell, 'DashboardPage_bedroomNestCell')).toEqual(0);
    }

    validateTheaterNestScreenshots() {
        let i = 0;
        while (parseInt(this.theaterNestTemperatureValue.getProperty('value'), 0) !== 77 && i < 100) {
            if (parseInt(this.theaterNestTemperatureValue.getProperty('value'), 0) < 77) {
                this.theaterNestIncreaseButton.click();
                browser.pause(1000);
            }
            if (parseInt(this.theaterNestTemperatureValue.getProperty('value'), 0) > 77) {
                this.theaterNestDecreaseButton.click();
                browser.pause(1000);
            }
            i += 1;
        }

        expect(browser.checkElement(this.theaterNestCell, 'DashboardPage_theaterNestCell')).toEqual(0);
    }
}

module.exports = new DashboardPage('', '/dashboard');
