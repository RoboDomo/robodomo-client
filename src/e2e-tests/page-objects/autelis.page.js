// autelis.page.js
import expect from 'expect';
import Page from './page';
import MenuComponent from './menu.component';
let counter = 0;

class AutelisPage extends Page {
    get pageContent() {return $('//div[contains(@class, "ion-page")]')}
    get autelisTab() {return $('#autelis-tabs-tab-autelis')}
    get allOffButton() {return $('//ion-segment-button[text()[contains(., "OFF")]]')}
    get poolButton() {return $('//ion-segment-button[text()[contains(., "POOL")]]')}
    get spaButton() {return $('//ion-segment-button[text()[contains(., "SPA")]]')}
    get switchMessageOff() {return $('//div[text()="All Off"]')}
    get switchMessagePool() {return $('//*[contains(@class, "AutelisTab_mainSwitch")]/parent::*//div[text()[starts-with(., "Pool")]]')}
    get switchMessageSpa() {return $('//*[contains(@class, "AutelisTab_mainSwitch")]/parent::*//div[text()[starts-with(., "Spa")]]')}
    get switchMessageSolar() {return $('*//div[text()[starts-with(., "Solar")]]')}

    // 0 - Solar; 1 - Cleaner; 2 - Pool Heat; 3 - Pool Light; 4 - Waterfall; 5 - Spa Heat;
    // 6 - Jets; 7 - Spa Light; 8 - Blower
    get onButton() {return $$('//*[contains(@class, "AutelisTab_toggle")]//ion-label[text()="On"]')}
    get onButtonStatus() {return $$('//*[contains(@class, "AutelisTab_toggle")]//ion-segment-button[1]')}
    get offButton() {return $$('//*[contains(@class, "AutelisTab_toggle")]//ion-label[text()="Off"]')}
    get offButtonStatus() {return $$('//*[contains(@class, "AutelisTab_toggle")]//ion-segment-button[2]')}
    // 0 - Pool lower; 1 - Pool higher; 2 - Spa lower; 3 - Spa Higher
    get poolSpaHeatAdjButtons() {return $$('//*[@id="autelis-tabs-tabpane-autelis"]//*[contains(@class, "button-small")]')}
    // 0 - Pool Counter; 1 - Spa Counter
    get poolSpaHeatCounter() {return $$('//*[contains(@class, "native-input")]')}

    checkPoolHeatDecreased() {
        browser.waitUntil(() => {
            return parseInt(this.poolSpaHeatCounter[0].getValue()) === counter - 1;
        }, 10000);
    }

    checkPoolHeatIncreased() {
        browser.waitUntil(() => {
            return parseInt(this.poolSpaHeatCounter[0].getValue()) === counter + 1;
        }, 10000);
    }

    checkSpaHeatDecreased() {
        browser.waitUntil(() => {
            return parseInt(this.poolSpaHeatCounter[1].getValue()) === counter - 1;
        }, 10000);
    }

    checkSpaHeatIncreased() {
        browser.waitUntil(() => {
            return parseInt(this.poolSpaHeatCounter[1].getValue()) === counter + 1;
        }, 10000);
    }

    clickBlowerOnButton() {
        this.onButton[8].click();
    }

    clickBlowerOffButton() {
        this.offButton[8].click();
    }

    clickCleanerOnButton() {
        this.onButton[1].click();
    }

    clickCleanerOffButton() {
        this.offButton[1].click();
    }

    clickDecreasePoolHeat() {
        counter = parseInt(this.poolSpaHeatCounter[0].getValue());
        this.poolSpaHeatAdjButtons[0].click();
    }

    clickDecreaseSpaHeat() {
        counter = parseInt(this.poolSpaHeatCounter[1].getValue());
        this.poolSpaHeatAdjButtons[2].click();
    }

    clickIncreasePoolHeat() {
        counter = parseInt(this.poolSpaHeatCounter[0].getValue());
        this.poolSpaHeatAdjButtons[1].click();
    }

    clickIncreaseSpaHeat() {
        counter = parseInt(this.poolSpaHeatCounter[1].getValue());
        this.poolSpaHeatAdjButtons[3].click();
    }

    clickJetsOnButton () {
        this.onButton[6].click();
    }

    clickJetsOffButton () {
        this.offButton[6].click();
    }

    clickPoolHeatOnButton() {
        this.onButton[2].click();
    }

    clickPoolHeatOffButton() {
        this.offButton[2].click();
    }

    clickPoolLightOnButton() {
        this.onButton[3].click();
    }

    clickPoolLightOffButton() {
        this.offButton[3].click();
    }

    clickOffButton() {
        this.allOffButton.click();
    }

    clickPoolButton() {
        this.poolButton.click();
    }

    clickSolarOnButton() {
        this.onButton[0].click();
    }

    clickSolarOffButton() {
        this.offButton[1].click();
    }

    clickSpaButton() {
        this.spaButton.click();
    }

    clickSpaHeatOnButton() {
        this.onButton[5].click();
    }

    clickSpaHeatOffButton() {
        this.offButton[5].click();
    }

    clickSpaLightOnButton() {
        this.onButton[7].click();
    }

    clickSpaLightOffButton() {
        this.offButton[7].click();
    }

    clickWaterfallOnButton() {
        this.onButton[4].click();
    }

    clickWaterfallOffButton() {
        this.offButton[4].click();
    }

    isButtonEnabled(button) {
        browser.waitUntil(() => {
            return (button.getAttribute('checked').includes('true'));
        }, 20000);
    }

    isPoolAndSpaParametersTurnedOff() {
        this.allOffButton(this.spaButton);
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
        browser.waitUntil(() => {
            return this.allOffButton.isDisplayed();
        }, 20000);
    }
}

module.exports = new AutelisPage('', '/autelis');
