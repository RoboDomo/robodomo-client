// autelis.page.js
import Page from './page';
import MenuComponent from './menu.component';

class AutelisPage extends Page {
    get pageContent() {return $('//div[contains(@class, "ion-page")]')}
    get autelisTab() {return $('#autelis-tabs-tab-autelis')}
    get offButton() {return $('//button[text()[contains(., "OFF")]]')}
    get poolButton() {return $('//button[text()[contains(., "POOL")]]')}
    get spaButton() {return $('//button[text()[contains(., "SPA")]]')}
    get switchMessage() {return $('#autelis-tabs-tabpane-autelis>div>div:first-of-type>div:nth-of-type(2)>div:nth-of-type(2)')}

    get solarOnButton() {return $('#autelis-tabs-tabpane-autelis>div>div>div:nth-of-type(3)>div>button:first-of-type')}
    get solarOffButton() {return $('#autelis-tabs-tabpane-autelis>div>div>div:nth-of-type(3)>div>button:last-of-type')}
    get cleanerOnButton() {return $('#autelis-tabs-tabpane-autelis>div>div>div:nth-of-type(4)>div>button:first-of-type')}
    get cleanerOffButton() {return $('#autelis-tabs-tabpane-autelis>div>div>div:nth-of-type(4)>div>button:last-of-type')}

    get poolHeatOnButton() {return $('#autelis-tabs-tabpane-autelis>div>div>div:first-of-type>div>div>div>button:first-of-type')}
    get poolHeatOffButton() {return $('#autelis-tabs-tabpane-autelis>div>div>div:first-of-type>div>div>div>button:last-of-type')}
    get poolLightOnButton() {return $('#autelis-tabs-tabpane-autelis>div>div:nth-of-type(2)>div:first-of-type>div:nth-of-type(2) button:first-of-type')}
    get poolLightOffButton() {return $('#autelis-tabs-tabpane-autelis>div>div:nth-of-type(2)>div:first-of-type>div:nth-of-type(2) button:last-of-type')}
    get waterfallOnButton() {return $('#autelis-tabs-tabpane-autelis>div>div:nth-of-type(2)>div:first-of-type>div:nth-of-type(3) button:first-of-type')}
    get waterfallOffButton() {return $('#autelis-tabs-tabpane-autelis>div>div:nth-of-type(2)>div:first-of-type>div:nth-of-type(3) button:last-of-type')}

    get spaHeatOnButton() {return $('#autelis-tabs-tabpane-autelis>div>div>div:last-of-type>div>div>div>button:first-of-type')}
    get spaHeatOffButton() {return $('#autelis-tabs-tabpane-autelis>div>div>div:last-of-type>div>div>div>button:last-of-type')}
    get jetsOnButton() {return $('#autelis-tabs-tabpane-autelis>div>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(2) button:first-of-type')}
    get jetsOffButton() {return $('#autelis-tabs-tabpane-autelis>div>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(2) button:last-of-type')}
    get spaLightOnButton() {return $('#autelis-tabs-tabpane-autelis>div>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(3) button:first-of-type')}
    get spaLightOffButton() {return $('#autelis-tabs-tabpane-autelis>div>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(3) button:last-of-type')}
    get blowerOnButton() {return $('#autelis-tabs-tabpane-autelis>div>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(4) button:first-of-type')}
    get blowerOffButton() {return $('#autelis-tabs-tabpane-autelis>div>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(4) button:last-of-type')}

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
        }, 10000);
        expect(this.switchMessage.getText()).to.equal('All Off');
    }

    isPoolParametersAreDisplayed() {
        browser.waitUntil(() => {
            return this.poolButton.getAttribute('class').includes('btn-success');
        }, 5000);
        expect(this.switchMessage.getText()).to.satisfy(poolInfo => {
            return /^Pool\s\d{2,3}°F$/.test(poolInfo);
        });
    }

    isSpaParametersAreDisplayed() {
        browser.waitUntil(() => {
            return this.spaButton.getAttribute('class').includes('btn-danger');
        }, 5000);
        expect(this.switchMessage.getText()).to.satisfy(spaInfo => {
            return /^Spa\s\d{2,3}°F$/.test(spaInfo);
        });
    }

    goToAutelisTab() {
        this.autelisTab.click();
    }
}

module.exports = new AutelisPage('', '/autelis');
