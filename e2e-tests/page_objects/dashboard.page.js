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

    get bedroomBathroomLightButton() { return this.activeTab.$('.//ion-card[contains(.,"Bathroom Light")]'); }
    get bedroomBathroomLightDiv() { return this.theaterCeilingFanLightButton.$('./parent::div'); }
    get bedroomBedroomFanButton() { return this.activeTab.$('.//ion-card[contains(.,"Bedroom Fan")]'); }
    get bedroomBedroomFanDiv() { return this.theaterCeilingFanLightButton.$('./parent::div'); }
    get bedroomBedroomLampButton() { return this.activeTab.$('.//ion-card[contains(.,"Bedroom Lamp")]'); }
    get bedroomBedroomLampDiv() { return this.theaterCeilingFanLightButton.$('./parent::div'); }
    get bedroomBedroomLightButton() { return this.activeTab.$('.//ion-card[contains(.,"Bedroom Light")]'); }
    get bedroomBedroomLightDiv() { return this.theaterCeilingFanLightButton.$('./parent::div'); }
    get bedroomNestCell() { return this.activeTab.$('.//form/parent::div/parent::ion-card-content'); }
    get bedroomNestDecreaseButton() { return this.activeTab.$('.//form//button[1]'); }
    get bedroomNestTemperatureValue() { return this.activeTab.$('.//form//input'); }
    get bedroomNestIncreaseButton() { return this.activeTab.$('.//form//button[2]'); }


    get theaterCeilingFanButton() { return this.activeTab.$('.//ion-card[contains(.,"Ceiling Fan")]'); }
    get theaterCeilingFanDiv() { return this.theaterCeilingFanLightButton.$('./parent::div'); }
    get theaterCeilingFanLightButton() { return this.activeTab.$('.//ion-card[contains(.,"Ceiling Fan Light")]'); }
    get theaterCeilingFanLightDiv() { return this.theaterCeilingFanLightButton.$('./parent::div'); }
    get theaterKitchenLightButton() { return this.activeTab.$('.//ion-card[contains(.,"Kitchen Light")]'); }
    get theaterKitchenLightDiv() { return this.theaterCeilingFanLightButton.$('./parent::div'); }
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

    validateBathroomLightState(state) {
        this.bedroomBathroomLightDiv.waitForAnimation();
        expect(this.bedroomBathroomLightButton.getText().toLowerCase()).toEqual(state);
    }

    validateBedroomFanState(state) {
        this.bedroomBedroomFanDiv.waitForAnimation();
        expect(this.bedroomBedroomFanButton.getText().toLowerCase()).toEqual(state);
    }

    validateBedroomLampState(state) {
        this.bedroomBedroomLampDiv.waitForAnimation();
        expect(this.bedroomBedroomLampButton.getText().toLowerCase()).toEqual(state);
    }

    validateBedroomLightState(state) {
        this.bedroomBedroomLightDiv.waitForAnimation();
        expect(this.bedroomBedroomLightButton.getText().toLowerCase()).toEqual(state);
    }

    validateCeilingFanState(state) {
        this.theaterCeilingFanDiv.waitForAnimation();
        expect(this.theaterCeilingFanButton.getText().toLowerCase()).toEqual(state);
    }

    validateCeilingFanLightState(state) {
        this.theaterCeilingFanLightDiv.waitForAnimation();
        expect(this.theaterCeilingFanLightButton.getText()).toContain(`${state.toString()}%`);
    }

    validateKitchenLightState(state) {
        this.theaterKitchenLightDiv.waitForAnimation();
        expect(this.theaterKitchenLightButton.getText().toLowerCase()).toEqual(state);
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
