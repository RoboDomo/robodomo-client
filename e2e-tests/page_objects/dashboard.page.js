import expect from 'expect';
import Page from './page';

/** DashboardPage selenium page-object */
class DashboardPage extends Page {
    get tabContent() { return $('//ion-content[@id="tab-dashboard"]'); }

    get activeTab() { return this.tabContent.$('.//div[@class="ion-page"]'); }

    get bedroomTabButton() { return this.tabContent.$('.//ion-tab-button[@id="tab-button-bedroom"]'); }
    get bedroomTabDiv() { return this.bedroomTabButton.$('./div'); }
    get theaterTabButton() { return this.tabContent.$('.//ion-tab-button[@id="tab-button-theater"]'); }
    get theaterTabDiv() { return this.theaterTabButton.$('./div'); }

    get bedroomNestCell() { return this.activeTab.$('.//form/parent::div/parent::ion-card-content'); }
    get bedroomNestDecreaseButton() { return this.activeTab.$('.//form//button[1]'); }
    get bedroomNestTemperatureValue() { return this.activeTab.$('.//form//input'); }
    get bedroomNestIncreaseButton() { return this.activeTab.$('.//form//button[2]'); }

    get theaterCeilingFanLightButton() { return this.activeTab.$('.//ion-card[contains(.,"Ceiling Fan Light")]'); }
    get theaterCeilingFanLightDiv() { return this.theaterCeilingFanLightButton.$('./parent::div'); }
    get theaterNestCell() { return this.activeTab.$('.//form/parent::div/parent::ion-card-content'); }
    get theaterNestDecreaseButton() { return this.activeTab.$('.//form//button[1]'); }
    get theaterNestTemperatureValue() { return this.activeTab.$('.//form//input'); }
    get theaterNestIncreaseButton() { return this.activeTab.$('.//form//button[2]'); }

    goToBedroomTab() {
        if (this.bedroomTabButton.getAttribute('aria-selected') !== 'true') {
            this.bedroomTabDiv.waitForAnimation();
            this.bedroomTabButton.click();
        }
    }

    goToTheaterTab() {
        if (this.theaterTabButton.getAttribute('aria-selected') !== 'true') {
            this.theaterTabDiv.waitForAnimation();
            this.theaterTabButton.click();
        }
    }

    isBedroomTabSelected() {
        browser.waitUntil(() => this.bedroomTabButton.getAttribute('aria-selected') === 'true', 5000);
    }

    isTheaterTabSelected() {
        browser.waitUntil(() => this.theaterTabButton.getAttribute('aria-selected') === 'true', 5000);
    }

    validateTabButtonsScreenshots() {
        expect(browser.checkElement(this.bedroomTabButton, 'DashboardPage_bedroomTabButton')).toEqual(0);
        this.goToBedroomTab();
        expect(browser.checkElement(this.bedroomTabButton, 'DashboardPage_bedroomTabButton_Active')).toEqual(0);

        expect(browser.checkElement(this.theaterTabButton, 'DashboardPage_theaterTabButton')).toEqual(0);
        this.goToTheaterTab();
        expect(browser.checkElement(this.theaterTabButton, 'DashboardPage_theaterTabButton_Active')).toEqual(0);
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
