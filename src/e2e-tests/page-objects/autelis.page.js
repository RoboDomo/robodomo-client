// autelis.page.js
import expect from "expect";
import Page from "./page";
import MenuComponent from "./menu.component";
let counter = 0;

class AutelisPage extends Page {
    get pageContent() {
        return $('//div[contains(@class, "ion-page")]');
    }
    get autelisTab() {
        return $("#autelis-tabs-tab-autelis");
    }
    get offButton() {
        return $('//ion-segment-button[text()[contains(., "OFF")]]');
    }
    get poolButton() {
        return $('//ion-segment-button[text()[contains(., "POOL")]]');
    }
    get spaButton() {
        return $('//ion-segment-button[text()[contains(., "SPA")]]');
    }
    get switchMessageOff() {
        return $('//div[text()="All Off"]');
    }
    get switchMessagePool() {
        return $(
            '//*[contains(@class, "AutelisTab_mainSwitch")]/parent::*//div[text()[starts-with(., "Pool")]]'
        );
    }
    get switchMessageSpa() {
        return $(
            '//*[contains(@class, "AutelisTab_mainSwitch")]/parent::*//div[text()[starts-with(., "Spa")]]'
        );
    }
    get switchMessageSolar() {
        return $('*//div[text()[starts-with(., "Solar")]]');
    }

    get solarOnButton() {
        return $('//*[contains(text(), "Solar")]/parent::*//ion-segment-button[.="On"]');
    }
    get solarOffButton() {
        return $('//*[contains(text(), "Solar")]/parent::*//ion-segment-button[.="Off"]');
    }
    get cleanerOnButton() {
        return $('//div[text()="Cleaner"]/parent::*//ion-segment-button[.="On"]');
    }
    get cleanerOffButton() {
        return $('//div[text()="Cleaner"]/parent::*//ion-segment-button[.="Off"]');
    }

    get poolHeatOnButton() {
        return $('//div[text()="Pool Heat"]/parent::*//ion-segment-button[.="On"]');
    }
    get poolHeatOffButton() {
        return $('//div[text()="Pool Heat"]/parent::*//ion-segment-button[.="Off"]');
    }
    get poolLightOnButton() {
        return $('//div[text()="Pool Light"]/parent::*//ion-segment-button[.="On"]');
    }
    get poolLightOffButton() {
        return $('//div[text()="Pool Light"]/parent::*//ion-segment-button[.="Off"]');
    }
    get waterfallOnButton() {
        return $('//div[text()="Waterfall"]/parent::*//ion-segment-button[.="On"]');
    }
    get waterfallOffButton() {
        return $('//div[text()="Waterfall"]/parent::*//ion-segment-button[.="Off"]');
    }

    get spaHeatOnButton() {
        return $('//div[text()="Spa Heat"]/parent::*//ion-segment-button[.="On"]');
    }
    get spaHeatOffButton() {
        return $('//div[text()="Spa Heat"]/parent::*//ion-segment-button[.="Off"]');
    }
    get jetsOnButton() {
        return $('//div[text()="Jets"]/parent::*//ion-segment-button[.="On"]');
    }
    get jetsOffButton() {
        return $('//div[text()="Jets"]/parent::*//ion-segment-button[.="Off"]');
    }
    get spaLightOnButton() {
        return $('//div[text()="Spa Light"]/parent::*//ion-segment-button[.="On"]');
    }
    get spaLightOffButton() {
        return $('//div[text()="Spa Light"]/parent::*//ion-segment-button[.="Off"]');
    }
    get blowerOnButton() {
        return $('//div[text()="Blower"]/parent::*//ion-segment-button[.="On"]');
    }
    get blowerOffButton() {
        return $('//div[text()="Blower"]/parent::*//ion-segment-button[.="Off"]');
    }

    // 0 - Lower; 1 - Higher
    get poolHeatAdjButtons() {
        return $$('//div[text()="Pool Heat"]/parent::*//*[contains(@class, "button-small")]');
    }
    get spaHeatAdjButtons() {
        return $$('//div[text()="Spa Heat"]/parent::*//*[contains(@class, "button-small")]');
    }

    get poolHeatCounter() {
        return $('//div[text()="Pool Heat"]/parent::*//*[contains(@class, "native-input")]');
    }
    get spaHeatCounter() {
        return $('//div[text()="Spa Heat"]/parent::*//*[contains(@class, "native-input")]');
    }

    checkPoolHeatDecreased() {
        browser.waitUntil(() => {
            return parseInt(this.poolHeatCounter.getValue()) === counter - 1;
        }, 10000);
    }

    checkPoolHeatIncreased() {
        browser.waitUntil(() => {
            return parseInt(this.poolHeatCounter.getValue()) === counter + 1;
        }, 10000);
    }

    checkSpaHeatDecreased() {
        browser.waitUntil(() => {
            return parseInt(this.spaHeatCounter.getValue()) === counter - 1;
        }, 10000);
    }

    checkSpaHeatIncreased() {
        browser.waitUntil(() => {
            return parseInt(this.spaHeatCounter.getValue()) === counter + 1;
        }, 10000);
    }

    clickBlowerOnButton() {
        this.blowerOnButton.click();
    }

    clickBlowerOffButton() {
        this.blowerOffButton.click();
    }

    clickCleanerOnButton() {
        this.cleanerOnButton.click();
    }

    clickCleanerOffButton() {
        this.cleanerOffButton.click();
    }

    clickDecreasePoolHeat() {
        counter = parseInt(this.poolHeatCounter.getValue());
        this.poolHeatAdjButtons[0].click();
    }

    clickDecreaseSpaHeat() {
        counter = parseInt(this.spaHeatCounter.getValue());
        this.spaHeatAdjButtons[0].click();
    }

    clickIncreasePoolHeat() {
        counter = parseInt(this.poolHeatCounter.getValue());
        this.poolHeatAdjButtons[1].click();
    }

    clickIncreaseSpaHeat() {
        counter = parseInt(this.spaHeatCounter.getValue());
        this.spaHeatAdjButtons[1].click();
    }

    clickJetsOnButton() {
        this.jetsOnButton.click();
    }

    clickJetsOffButton() {
        this.jetsOffButton.click();
    }

    clickPoolHeatOnButton() {
        this.poolHeatOnButton.click();
    }

    clickPoolHeatOffButton() {
        this.poolHeatOffButton.click();
    }

    clickPoolLightOnButton() {
        this.poolLightOnButton.click();
    }

    clickPoolLightOffButton() {
        this.poolLightOffButton.click();
    }

    clickOffButton() {
        this.offButton.click();
    }

    clickPoolButton() {
        this.poolButton.click();
    }

    clickSolarOnButton() {
        this.solarOnButton.click();
    }

    clickSolarOffButton() {
        this.solarOffButton.click();
    }

    clickSpaButton() {
        this.spaButton.click();
    }

    clickSpaHeatOnButton() {
        this.spaHeatOnButton.click();
    }

    clickSpaHeatOffButton() {
        this.spaHeatOffButton.click();
    }

    clickSpaLightOnButton() {
        this.spaLightOnButton.click();
    }

    clickSpaLightOffButton() {
        this.spaLightOffButton.click();
    }

    clickWaterfallOnButton() {
        this.waterfallOnButton.click();
    }

    clickWaterfallOffButton() {
        this.waterfallOffButton.click();
    }

    isButtonEnabled(button) {
        browser.waitUntil(() => {
            return button.getAttribute("checked").includes("true");
        }, 20000);
    }

    isPoolAndSpaParametersTurnedOff() {
        this.isButtonEnabled(this.offButton);
        browser.waitUntil(() => {
            return this.switchMessageOff.isDisplayed();
        }, 10000);
    }

    isPoolParameterDisplayed() {
        this.isButtonEnabled(this.poolButton);
        expect(this.switchMessagePool.getText()).toMatch(/^Pool\s\d{2,3}°F$/);
    }

    isSpaAndSolarParameterDisplayed() {
        this.isButtonEnabled(this.spaButton);
        expect(this.switchMessageSpa.getText()).toMatch(/^Spa\s\d{2,3}°F$/);
        expect(this.switchMessageSolar.getText()).toMatch(/^Solar\s\d{2,3}°F$/);
    }

    goToAutelisTab() {
        this.autelisTab.click();
        // TODO Remove after module load fix
        browser.pause(500);
    }
}

module.exports = new AutelisPage("", "/autelis");
