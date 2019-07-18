// smartthings.page.js
import Page from '../page';
import MenuComponent from '../menu.component';
import TheaterTabPage from './theaterTab.component';
import OfficeTabPage from './officeTab.component';
import BackRoomTabPage from './backRoomTab.component';
import BedroomTabPage from './bedroomTab.component';
import KitchenTabPage from './kitchenTab.component';
import BathroomTabPage from './bathroomTab.component';
import OutsideTabPage from './outsideTab.component';

class SmartThingsPage extends Page {
    get pageContent() { return $('//div[contains(@class, "ion-page")]') }
    get theaterTabButton() {return $('//a[text()= "Theater"]')}
    get officeTabButton() { return $('//a[text()= "Office"]') }
    get backRoomTabButton() { return $('//a[text()= "Back Room"]') }
    get bedroomTabButton() { return $('//a[text()= "Bedroom"]') }
    get kitchenTabButton() { return $('//a[text()= "Kitchen"]') }
    get bathroomTabButton() { return $('//a[text()= "Bathroom"]') }
    get outsideTabButton() { return $('//a[text()= "Outside"]') }

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
            getTheaterTab() {return TheaterTabPage},
            getOfficeTab() {return OfficeTabPage},
            getBackRoomTabPage() {return BackRoomTabPage},
            getBedroomTabPage() {return BedroomTabPage},
            getKitchenTabPage() {return KitchenTabPage},
            getBathroomTabPage() {return BathroomTabPage},
            getOutsideTabPage() {return OutsideTabPage}
        }
    }
    getTheaterTab() {return TheaterTabPage}
    getOfficeTab() {return OfficeTabPage}
    getBackRoomTabPage() {return BackRoomTabPage}
    getBedroomTabPage() {return BedroomTabPage}
    getKitchenTabPage() {return KitchenTabPage}
    getBathroomTabPage() {return BathroomTabPage}
    getOutsideTabPage() {return OutsideTabPage}
}

module.exports = new SmartThingsPage('', '/smartthings');
