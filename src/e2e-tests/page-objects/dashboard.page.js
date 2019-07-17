// dashboard.page.js
import Page from './page';

import expect from 'expect';

class DashboardPage extends Page {

    get pageContent() { return $('//div[contains(@class, "ion-page")]/ion-content[@id="tab-dashboard"]') }

    get bedroomTabButton() { return $('#dashboard-tabs-tab-bedroom') }
    get bedroomTabPane() { return $('#dashboard-tabs-tabpane-bedroom') }

    get bedroomNestCell() { return this.bedroomTabPane.$('//form/parent::div/parent::ion-card-content') }
    get bedroomNestDecreaseButton() { return this.bedroomTabPane.$('//form//button[1]') }
    get bedroomNestTemperatureValue() { return this.bedroomTabPane.$('//form//input') }
    get bedroomNestIncreaseButton() { return this.bedroomTabPane.$('//form//button[2]') }

    get theaterTabButton() { return $('#dashboard-tabs-tab-theater') }
    get theaterTabPane() { return $('#dashboard-tabs-tabpane-theater') }

    get theaterNestCell() { return this.theaterTabPane.$('//form/parent::div/parent::ion-card-content') }
    get theaterNestDecreaseButton() { return this.theaterTabPane.$('//form//button[1]') }
    get theaterNestTemperatureValue() { return this.theaterTabPane.$('//form//input') }
    get theaterNestIncreaseButton() { return this.theaterTabPane.$('//form//button[2]') }

    goToBedroomTab() {
        this.bedroomTabButton.click();
    }

    goToTheaterTab() {
        this.theaterTabButton.click();
    }

    isBedroomTabSelected() {
        browser.waitUntil(() => {
            return this.bedroomTabButton.getAttribute('aria-selected') === "true";
        }, 5000);
        this.bedroomTabPane.isDisplayed()
    }

    isTheaterTabSelected() {
        browser.waitUntil(() => {
            return this.theaterTabButton.getAttribute('aria-selected') === "true";
        }, 5000);
        this.theaterTabPane.isDisplayed()

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
        let i=0;
        while (parseInt(this.bedroomNestTemperatureValue.getProperty('value')) !== 77 && i <100) {
            if (parseInt(this.bedroomNestTemperatureValue.getProperty('value')) < 77) {
                this.bedroomNestIncreaseButton.click();
                browser.pause(1000);
            }
            if (parseInt(this.bedroomNestTemperatureValue.getProperty('value')) > 77) {
                this.bedroomNestDecreaseButton.click();
                browser.pause(1000);
            }
            i += 1;
        }

        expect(browser.checkElement(this.bedroomNestCell, 'DashboardPage_bedroomNestCell')).toEqual(0);

    }

    validateTheaterNestScreenshots() {
        let i=0;
        while (parseInt(this.theaterNestTemperatureValue.getProperty('value')) !== 77 && i <100) {
            if (parseInt(this.theaterNestTemperatureValue.getProperty('value')) < 77) {
                this.theaterNestIncreaseButton.click();
                browser.pause(1000);
            }
            if (parseInt(this.theaterNestTemperatureValue.getProperty('value')) > 77) {
                this.theaterNestDecreaseButton.click();
                browser.pause(1000);
            }
            i += 1;
        }

        expect(browser.checkElement(this.theaterNestCell, 'DashboardPage_theaterNestCell')).toEqual(0);

    }
}

module.exports = new DashboardPage('', '/dashboard');
