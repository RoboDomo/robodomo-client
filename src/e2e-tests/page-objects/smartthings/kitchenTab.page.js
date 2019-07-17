// kitchenTab.page.js
import Page from '../page';
import MenuComponent from '../menu.component';

class KitchenTabPage extends Page {
    get kitchenLightOnSwitch() {return $('//div[text()="Kitchen Light"]/parent::*//ion-toggle[@checked="true"]')}
    get kitchenLightOffSwitch() {return $('//div[text()="Kitchen Light"]/parent::*//ion-toggle[@checked="false"]')}

    clickKitchenLightOnSwitch() {
        if (this.isButtonDisplayed(this.kitchenLightOffSwitch)) {
            this.kitchenLightOffSwitch.click();
        }
    }

    clickKitchenLightOffSwitch() {
        if (this.isButtonDisplayed(this.kitchenLightOnSwitch)) {
            this.kitchenLightOnSwitch.click();
        }
    }
}

module.exports = new KitchenTabPage('', '/kitchenTab');
