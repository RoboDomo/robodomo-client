import Page from './page';
import TheaterTabComponent from './smartthings/theaterTab.component';
import OfficeTabComponent from './smartthings/officeTab.component';
import BackRoomTabComponent from './smartthings/backRoomTab.component';
import BedroomTabComponent from './smartthings/bedroomTab.component';
import KitchenTabComponent from './smartthings/kitchenTab.component';
import BathroomTabComponent from './smartthings/bathroomTab.component';
import OutsideTabComponent from './smartthings/outsideTab.component';

/** SmartThingsPage selenium page-object */
class SmartThingsPage extends Page {
    get tabContent() { return $('//ion-content[@id="tab-smartthings"]'); }

    get allTabButton() { return this.tabContent.$('.//ion-tab-button[@tab = "all"]'); }
    get allTabDiv() { return this.theaterTabButton.$('./div'); }
    get theaterTabButton() { return this.tabContent.$('.//ion-tab-button[@tab = "theater"]'); }
    get theaterTabDiv() { return this.theaterTabButton.$('./div'); }
    get officeTabButton() { return this.tabContent.$('.//ion-tab-button[@tab = "office"]'); }
    get officeTabDiv() { return this.officeTabButton.$('./div'); }
    get backRoomTabButton() { return this.tabContent.$('.//ion-tab-button[@tab = "backroom"]'); }
    get backRoomTabDiv() { return this.backRoomTabButton.$('./div'); }
    get bedroomTabButton() { return this.tabContent.$('.//ion-tab-button[@tab = "bedroom"]'); }
    get bedroomTabDiv() { return this.bedroomTabButton.$('./div'); }
    get kitchenTabButton() { return this.tabContent.$('.//ion-tab-button[@tab = "kitchen"]'); }
    get kitchenTabDiv() { return this.kitchenTabButton.$('./div'); }
    get bathroomTabButton() { return this.tabContent.$('.//ion-tab-button[@tab = "bathroom"]'); }
    get bathroomTabDiv() { return this.bathroomTabButton.$('./div'); }
    get outsideTabButton() { return this.tabContent.$('.//ion-tab-button[@tab = "outside"]'); }
    get outsideTabDiv() { return this.outsideTabButton.$('./div'); }

    gotoAllTab() {
        if (this.allTabButton.getAttribute('aria-selected') !== 'true') {
            this.allTabDiv.waitForAnimation();
            this.allTabButton.click();
        }
    }

    goToTheaterTab() {
        if (this.theaterTabButton.getAttribute('aria-selected') !== 'true') {
            this.theaterTabDiv.waitForAnimation();
            this.theaterTabButton.click();
        }
    }

    goToOfficeTab() {
        if (this.officeTabButton.getAttribute('aria-selected') !== 'true') {
            this.officeTabDiv.waitForAnimation();
            this.officeTabButton.click();
        }
    }

    goToBackRoomTab() {
        if (this.backRoomTabButton.getAttribute('aria-selected') !== 'true') {
            this.backRoomTabDiv.waitForAnimation();
            this.backRoomTabButton.click();
        }
    }

    goToBedroomTab() {
        if (this.bedroomTabButton.getAttribute('aria-selected') !== 'true') {
            this.bedroomTabDiv.waitForAnimation();
            this.bedroomTabButton.click();
        }
    }

    goToKitchenTab() {
        if (this.kitchenTabButton.getAttribute('aria-selected') !== 'true') {
            this.kitchenTabDiv.waitForAnimation();
            this.kitchenTabButton.click();
        }
    }

    goToBathroomTab() {
        if (this.bathroomTabButton.getAttribute('aria-selected') !== 'true') {
            this.bathroomTabDiv.waitForAnimation();
            this.bathroomTabButton.click();
        }
    }

    goToOutsideTab() {
        if (this.outsideTabButton.getAttribute('aria-selected') !== 'true') {
            this.outsideTabDiv.waitForAnimation();
            this.outsideTabButton.click();
        }
    }

    isAllTabSelected() {
        browser.waitUntil(() => this.allTabButton.getAttribute('aria-selected') === 'true', 5000);
    }

    isTheaterTabSelected() {
        browser.waitUntil(() => this.theaterTabButton.getAttribute('aria-selected') === 'true', 5000);
    }

    isOfficeTabSelected() {
        browser.waitUntil(() => this.officeTabButton.getAttribute('aria-selected') === 'true', 5000);
    }

    isBackRoomTabTabSelected() {
        browser.waitUntil(() => this.backRoomTabButton.getAttribute('aria-selected') === 'true', 5000);
    }

    isBedroomTabSelected() {
        browser.waitUntil(() => this.bedroomTabButton.getAttribute('aria-selected') === 'true', 5000);
    }

    isKitchenTabSelected() {
        browser.waitUntil(() => this.kitchenTabButton.getAttribute('aria-selected') === 'true', 5000);
    }

    isBathroomTabSelected() {
        browser.waitUntil(() => this.bathroomTabButton.getAttribute('aria-selected') === 'true', 5000);
    }

    isOutsideTabSelected() {
        browser.waitUntil(() => this.outsideTabButton.getAttribute('aria-selected') === 'true', 5000);
    }

    getAllTab() {
        let tabContent = this.tabContent;
        return {
            getTheaterTab() { return new TheaterTabComponent(tabContent); },
            getOfficeTab() { return new OfficeTabComponent(tabContent); },
            getBackRoomTab() { return new BackRoomTabComponent(tabContent); },
            getBedroomTab() { return new BedroomTabComponent(tabContent); },
            getKitchenTab() { return new KitchenTabComponent(tabContent); },
            getBathroomTab() { return new BathroomTabComponent(tabContent); },
            getOutsideTab() { return new OutsideTabComponent(tabContent); },
        };
    }

    getTheaterTab() { return new TheaterTabComponent(this.tabContent); }
    getOfficeTab() { return new OfficeTabComponent(this.tabContent); }
    getBackRoomTab() { return new BackRoomTabComponent(this.tabContent); }
    getBedroomTab() { return new BedroomTabComponent(this.tabContent); }
    getKitchenTab() { return new KitchenTabComponent(this.tabContent); }
    getBathroomTab() { return new BathroomTabComponent(this.tabContent); }
    getOutsideTab() { return new OutsideTabComponent(this.tabContent); }
}

module.exports = new SmartThingsPage('', '/smartthings');
