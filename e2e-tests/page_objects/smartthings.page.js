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
    get theaterTabButton() { return $('//a[text()= "Theater"]'); }
    get officeTabButton() { return $('//a[text()= "Office"]'); }
    get backRoomTabButton() { return $('//a[text()= "Back Room"]'); }
    get bedroomTabButton() { return $('//a[text()= "Bedroom"]'); }
    get kitchenTabButton() { return $('//a[text()= "Kitchen"]'); }
    get bathroomTabButton() { return $('//a[text()= "Bathroom"]'); }
    get outsideTabButton() { return $('//a[text()= "Outside"]'); }

    goToTheaterTab() {
        this.theaterTabButton.click();
    }

    goToOfficeTab() {
        this.officeTabButton.click();
    }

    goToBackRoomTab() {
        this.backRoomTabButton.click();
    }

    goToBedroomTab() {
        this.bedroomTabButton.click();
    }

    goToKitchenTab() {
        this.kitchenTabButton.click();
    }

    goToBathroomTab() {
        this.bathroomTabButton.click();
    }

    goToOutsideTab() {
        this.outsideTabButton.click();
    }

    isTheaterTabSelected() {
        browser.waitUntil(() => this.theaterTabButton.getAttribute('aria-selected') === 'true', 5000);
        this.getTheaterTab().tabPane.isDisplayed();
    }

    isOfficeTabSelected() {
        browser.waitUntil(() => this.officeTabButton.getAttribute('aria-selected') === 'true', 5000);
        this.getOfficeTab().tabPane.isDisplayed();
    }

    isBackRoomTabTabSelected() {
        browser.waitUntil(() => this.backRoomTabButton.getAttribute('aria-selected') === 'true', 5000);
        this.getBackRoomTab().tabPane.isDisplayed();
    }

    isBedroomTabSelected() {
        browser.waitUntil(() => this.bedroomTabButton.getAttribute('aria-selected') === 'true', 5000);
        this.getBedroomTab().tabPane.isDisplayed();
    }

    isKitchenTabSelected() {
        browser.waitUntil(() => this.kitchenTabButton.getAttribute('aria-selected') === 'true', 5000);
        this.getKitchenTab().tabPane.isDisplayed();
    }

    isBathroomTabSelected() {
        browser.waitUntil(() => this.bathroomTabButton.getAttribute('aria-selected') === 'true', 5000);
        this.getBathroomTab().tabPane.isDisplayed();
    }

    isOutsideTabSelected() {
        browser.waitUntil(() => this.outsideTabButton.getAttribute('aria-selected') === 'true', 5000);
        this.getOutsideTab().tabPane.isDisplayed();
    }

    getAllTab() {
        return {
            getTheaterTab() { return TheaterTabComponent; },
            getOfficeTab() { return OfficeTabComponent; },
            getBackRoomTab() { return BackRoomTabComponent; },
            getBedroomTab() { return BedroomTabComponent; },
            getKitchenTab() { return KitchenTabComponent; },
            getBathroomTab() { return BathroomTabComponent; },
            getOutsideTab() { return OutsideTabComponent; },
        };
    }

    getTheaterTab() { return TheaterTabComponent; }
    getOfficeTab() { return OfficeTabComponent; }
    getBackRoomTab() { return BackRoomTabComponent; }
    getBedroomTab() { return BedroomTabComponent; }
    getKitchenTab() { return KitchenTabComponent; }
    getBathroomTab() { return BathroomTabComponent; }
    getOutsideTab() { return OutsideTabComponent; }
}

module.exports = new SmartThingsPage('', '/smartthings');
