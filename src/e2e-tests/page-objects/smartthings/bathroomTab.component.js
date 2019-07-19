// bathroomTab.component.js
import Page from '../page';
import MenuComponent from '../menu.component';

class BathroomTabComponent {
    get bathroomLightOnSwitch() {return $('//div[text()="Bathroom Light"]/parent::*//ion-toggle[@checked="true"]')}
    get bathroomLightOffSwitch() {return $('//div[text()="Bathroom Light"]/parent::*//ion-toggle[@checked="false"]')}

    clickBathroomLightOnSwitch() {
        if (this.bathroomLightOffSwitch.isDisplayed()) {
            this.bathroomLightOffSwitch.click();
        }
    }

    clickBathroomLightOffSwitch() {
        if (this.bathroomLightOnSwitch.isDisplayed()) {
            this.bathroomLightOnSwitch.click();
        }
    }
}

module.exports = new BathroomTabComponent('', '/bathroomTab');
