/* eslint max-len: ['error', { 'ignoreComments': true, 'ignoreStrings': true, 'ignoreTrailingComments': true }] */
/* eslint lines-between-class-members: ["error", "always", { exceptAfterSingleLine: true }] */
/* eslint class-methods-use-this: [0] */

import Page from './page';
import TheaterTabPage from './smartthings/theaterTab.component';
import OfficeTabPage from './smartthings/officeTab.component';
import BackRoomTabPage from './smartthings/backRoomTab.component';
import BedroomTabPage from './smartthings/bedroomTab.component';
import KitchenTabPage from './smartthings/kitchenTab.component';
import BathroomTabPage from './smartthings/bathroomTab.component';
import OutsideTabPage from './smartthings/outsideTab.component';

/** SmartThingsPage selenium page-object */
class SmartThingsPage extends Page {
    get pageContent() { return $('//div[contains(@class, "ion-page")]'); }
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

    getAllTab() {
        return {
            getTheaterTab() { return TheaterTabPage; },
            getOfficeTab() { return OfficeTabPage; },
            getBackRoomTabPage() { return BackRoomTabPage; },
            getBedroomTabPage() { return BedroomTabPage; },
            getKitchenTabPage() { return KitchenTabPage; },
            getBathroomTabPage() { return BathroomTabPage; },
            getOutsideTabPage() { return OutsideTabPage; },
        };
    }

    getTheaterTab() { return TheaterTabPage; }
    getOfficeTab() { return OfficeTabPage; }
    getBackRoomTabPage() { return BackRoomTabPage; }
    getBedroomTabPage() { return BedroomTabPage; }
    getKitchenTabPage() { return KitchenTabPage; }
    getBathroomTabPage() { return BathroomTabPage; }
    getOutsideTabPage() { return OutsideTabPage; }
}

module.exports = new SmartThingsPage('', '/smartthings');
