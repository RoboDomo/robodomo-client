// autelis.page.js
import Page from './page';
import MenuComponent from './menu.component';
let counter = 0;

class AutelisPage extends Page {
    get pageContent() {return $('//div[contains(@class, "ion-page")]')}
    get autelisTab() {return $('#autelis-tabs-tab-autelis')}
    get offButton() {return $('//button[text()[contains(., "OFF")]]')}
    get poolButton() {return $('//button[text()[contains(., "POOL")]]')}
    get spaButton() {return $('//button[text()[contains(., "SPA")]]')}
    get switchMessageOff() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="All Off"]')}
    get switchMessagePool() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()[starts-with(., "Pool")]]')}
    get switchMessageSpa() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()[starts-with(., "Spa")]]')}
    get switchMessageSolar() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()[starts-with(., "Solar")]]')}

    get solarOnButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()[starts-with(., "Solar")]]/parent::*//button[text()="On"]')}
    get solarOffButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()[starts-with(., "Solar")]]/parent::*//button[text()="Off"]')}
    get cleanerOnButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Cleaner"]/parent::*//button[text()="On"]')}
    get cleanerOffButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Cleaner"]/parent::*//button[text()="Off"]')}

    get poolHeatOnButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Pool Heat"]/parent::*//button[text()="On"]')}
    get poolHeatOffButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Pool Heat"]/parent::*//button[text()="Off"]')}
    get poolLightOnButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Pool Light"]/parent::*//button[text()="On"]')}
    get poolLightOffButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Pool Light"]/parent::*//button[text()="Off"]')}
    get waterfallOnButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Waterfall"]/parent::*//button[text()="On"]')}
    get waterfallOffButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Waterfall"]/parent::*//button[text()="Off"]')}

    get spaHeatOnButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Spa Heat"]/parent::*//button[text()="On"]')}
    get spaHeatOffButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Spa Heat"]/parent::*//button[text()="Off"]')}
    get jetsOnButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Jets"]/parent::*//button[text()="On"]')}
    get jetsOffButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Jets"]/parent::*//button[text()="Off"]')}
    get spaLightOnButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Spa Light"]/parent::*//button[text()="On"]')}
    get spaLightOffButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Spa Light"]/parent::*//button[text()="Off"]')}
    get blowerOnButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Blower"]/parent::*//button[text()="On"]')}
    get blowerOffButton() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Blower"]/parent::*//button[text()="Off"]')}

    // 0 - lower; 1 - higher
    get poolHeatAdjButtons() {return $$('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Pool Heat"]/parent::*//div[@class="float-right"]/button')}
    get poolHeatCounter() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Pool Heat"]/parent::*//div[@class="float-right"]/input')}
    // 0 - lower; 1 - higher
    get spaHeatAdjButtons() {return $$('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Spa Heat"]/parent::*//div[@class="float-right"]/button')}
    get spaHeatCounter() {return $('//*[@id="autelis-tabs-tabpane-autelis"]//div[text()="Spa Heat"]/parent::*//div[@class="float-right"]/input')}

    checkPoolHeatDecreased() {
        expect(parseInt(this.poolHeatCounter.getValue())).to.equal(counter - 1);
    }

    checkPoolHeatIncreased() {
        expect(parseInt(this.poolHeatCounter.getValue())).to.equal(counter + 1);
    }

    checkSpaHeatDecreased() {
        expect(parseInt(this.spaHeatCounter.getValue())).to.equal(counter - 1);
    }

    checkSpaHeatIncreased() {
        expect(parseInt(this.spaHeatCounter.getValue())).to.equal(counter + 1);
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

    clickJetsOnButton () {
        this.jetsOnButton.click();
    }

    clickJetsOffButton () {
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

    isButtonDisabled(button) {
        browser.waitUntil(() => {
            return button.getAttribute('class').includes('btn-dark');
        }, 5000);
    }

    isButtonEnabled(button) {
        browser.waitUntil(() => {
            return (button.getAttribute('class').includes('btn-success') | button.getAttribute('class').includes('btn-danger'));
        }, 5000);
    }

    isPoolAndSpaParametersTurnedOff() {
        browser.waitUntil(() => {
            return this.offButton.getAttribute('class').includes('btn-dark');
        }, 5000);
        browser.waitUntil(() => {
            return this.switchMessageOff.isDisplayed();
        }, 5000);
    }

    isPoolParameterDisplayed() {
        browser.waitUntil(() => {
            return this.poolButton.getAttribute('class').includes('btn-success');
        }, 5000);
        expect(this.switchMessagePool.getText()).to.satisfy(poolInfo => {
            return /^Pool\s\d{2,3}°F$/.test(poolInfo);
        });
    }

    isSolarParameterDisplayed() {
        expect(this.switchMessageSolar.getText()).to.satisfy(solarInfo => {
            return /^Solar\s\d{2,3}°F$/.test(solarInfo);
        });
    }

    isSpaParameterDisplayed() {
        browser.waitUntil(() => {
            return this.spaButton.getAttribute('class').includes('btn-danger');
        }, 5000);
        expect(this.switchMessageSpa.getText()).to.satisfy(spaInfo => {
            return /^Spa\s\d{2,3}°F$/.test(spaInfo);
        });
    }

    goToAutelisTab() {
        this.autelisTab.click();
    }
}

module.exports = new AutelisPage('', '/autelis');
