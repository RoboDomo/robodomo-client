import expect from 'expect';
import Page from './page';

/** AutelisPage selenium page-object */
class AutelisPage extends Page {
    get offButton() { return $('//ion-segment-button[text()[contains(., "OFF")]]'); }
    get poolButton() { return $('//ion-segment-button[text()[contains(., "POOL")]]'); }
    get spaButton() { return $('//ion-segment-button[text()[contains(., "SPA")]]'); }

    get switchMessageOff() { return $('//div[text()="All Off"]'); }
    get switchMessagePool() { return $('//*[contains(@class, "AutelisTab_mainSwitch")]/parent::*//div[text()[starts-with(., "Pool")]]'); }
    get switchMessageSpa() { return $('//*[contains(@class, "AutelisTab_mainSwitch")]/parent::*//div[text()[starts-with(., "Spa")]]'); }
    get switchMessageSolar() { return $('*//div[text()[starts-with(., "Solar")]]'); }

    get solarOnButton() { return $('//*[contains(text(), "Solar")]/parent::*//ion-segment-button[.="On"]'); }
    get solarOffButton() { return $('//*[contains(text(), "Solar")]/parent::*//ion-segment-button[.="Off"]'); }

    get cleanerOnButton() { return $('//div[text()="Cleaner"]/parent::*//ion-segment-button[.="On"]'); }
    get cleanerOffButton() { return $('//div[text()="Cleaner"]/parent::*//ion-segment-button[.="Off"]'); }

    get poolHeatOnButton() { return $('//div[text()="Pool Heat"]/parent::*//ion-segment-button[.="On"]'); }
    get poolHeatOffButton() { return $('//div[text()="Pool Heat"]/parent::*//ion-segment-button[.="Off"]'); }

    get poolLightOnButton() { return $('//div[text()="Pool Light"]/parent::*//ion-segment-button[.="On"]'); }
    get poolLightOffButton() { return $('//div[text()="Pool Light"]/parent::*//ion-segment-button[.="Off"]'); }

    get waterfallOnButton() { return $('//div[text()="Waterfall"]/parent::*//ion-segment-button[.="On"]'); }
    get waterfallOffButton() { return $('//div[text()="Waterfall"]/parent::*//ion-segment-button[.="Off"]'); }

    get spaHeatOnButton() { return $('//div[text()="Spa Heat"]/parent::*//ion-segment-button[.="On"]'); }
    get spaHeatOffButton() { return $('//div[text()="Spa Heat"]/parent::*//ion-segment-button[.="Off"]'); }

    get jetsOnButton() { return $('//div[text()="Jets"]/parent::*//ion-segment-button[.="On"]'); }
    get jetsOffButton() { return $('//div[text()="Jets"]/parent::*//ion-segment-button[.="Off"]'); }

    get spaLightOnButton() { return $('//div[text()="Spa Light"]/parent::*//ion-segment-button[.="On"]'); }
    get spaLightOffButton() { return $('//div[text()="Spa Light"]/parent::*//ion-segment-button[.="Off"]'); }

    get blowerOnButton() { return $('//div[text()="Blower"]/parent::*//ion-segment-button[.="On"]'); }
    get blowerOffButton() { return $('//div[text()="Blower"]/parent::*//ion-segment-button[.="Off"]'); }

    // 0 - Lower; 1 - Higher
    get poolHeatAdjButtons() { return $$('//div[text()="Pool Heat"]/parent::*//*[contains(@class, "button-small")]'); }
    get poolHeatCounter() { return $('//div[text()="Pool Heat"]/parent::*//*[contains(@class, "native-input")]'); }

    get spaHeatAdjButtons() { return $$('//div[text()="Spa Heat"]/parent::*//*[contains(@class, "button-small")]'); }
    get spaHeatCounter() { return $('//div[text()="Spa Heat"]/parent::*//*[contains(@class, "native-input")]'); }

    adjustPoolHeat(action) {
        let initialTemp = parseInt(this.poolHeatCounter.getValue(), 0);
        action === 'increases' ? this.poolHeatAdjButtons[1].click() : this.poolHeatAdjButtons[0].click();
        return initialTemp;
    }

    adjustSpaHeat(action) {
        let initialTemp = parseInt(this.spaHeatCounter.getValue(), 0);
        action === 'increases' ? this.spaHeatAdjButtons[1].click() : this.spaHeatAdjButtons[0].click();
        return initialTemp;
    }

    clickOffButton() {
        this.offButton.click();
        browser.pause(1500);
    }

    clickPoolButton() {
        this.poolButton.click();
        browser.pause(1500);
    }

    clickSpaButton() {
        this.spaButton.click();
        browser.pause(1500);
    }

    toggleBlower(state) {
        state === 'on' ? this.blowerOnButton.click() : this.blowerOffButton.click();
    }

    toggleCleaner(state) {
        state === 'on' ? this.cleanerOnButton.click() : this.cleanerOffButton.click();
        browser.pause(1500);
    }

    toggleJets(state) {
        state === 'on' ? this.jetsOnButton.click() : this.jetsOffButton.click();
    }

    togglePoolHeat(state) {
        state === 'on' ? this.poolHeatOnButton.click() : this.poolHeatOffButton.click();
    }

    togglePoolLight(state) {
        state === 'on' ? this.poolLightOnButton.click() : this.poolLightOffButton.click();
    }

    toggleSolar(state) {
        state === 'on' ? this.solarOnButton.click() : this.solarOffButton.click();
        browser.pause(1500);
    }

    toggleSpaHeat(state) {
        state === 'on' ? this.spaHeatOnButton.click() : this.spaHeatOffButton.click();
    }

    toggleSpaLight(state) {
        state === 'on' ? this.spaLightOnButton.click() : this.spaLightOffButton.click();
    }

    toggleWaterfall(state) {
        state === 'on' ? this.waterfallOnButton.click() : this.waterfallOffButton.click();
    }

    validatePoolTemperatureChange(action, initialPoolTemperature) {
        action === 'increased'
            ? expect(parseInt(this.poolHeatCounter.getValue(), 0)).toBeGreaterThan(initialPoolTemperature)
            : expect(parseInt(this.poolHeatCounter.getValue(), 0)).toBeLessThan(initialPoolTemperature);
    }

    validateSpaTemperatureChange(action, initialSpaTemperature) {
        action === 'increased'
            ? expect(parseInt(this.spaHeatCounter.getValue(), 0)).toBeGreaterThan(initialSpaTemperature)
            : expect(parseInt(this.spaHeatCounter.getValue(), 0)).toBeLessThan(initialSpaTemperature);
    }

    isPoolAndSpaParametersTurnedOff() {
        this.offButton.isButtonEnabled();
        browser.waitUntil(() => this.switchMessageOff.isDisplayed(), 10000);
    }

    isPoolandSolarParameterDisplayed() {
        this.poolButton.isButtonEnabled();
        expect(this.switchMessagePool.getText()).toMatch(/^Pool\s\d{2,3}°F$/);
        expect(this.switchMessageSolar.getText()).toMatch(/^Solar\s\d{2,3}°F$/);
    }

    isSpaAndSolarParameterDisplayed() {
        this.spaButton.isButtonEnabled();
        expect(this.switchMessageSpa.getText()).toMatch(/^Spa\s\d{2,3}°F$/);
        expect(this.switchMessageSolar.getText()).toMatch(/^Solar\s\d{2,3}°F$/);
    }

    goToAutelisTab() {
        this.autelisTab.click();
        browser.pause(2000);
    }
}

module.exports = new AutelisPage('', '/autelis');
