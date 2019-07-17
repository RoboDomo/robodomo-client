// bathroomTab.page.js
import Page from '../page';
import MenuComponent from '../menu.component';

class BathroomTabPage extends Page {
    get bathroomLightOnSwitch() {return $('//div[text()="Bathroom Light"]/parent::*//ion-toggle[@checked="true"]')}
    get bathroomLightOffSwitch() {return $('//div[text()="Bathroom Light"]/parent::*//ion-toggle[@checked="false"]')}

    clickBathroomLightOnSwitch() {
        if (this.isButtonDisplayed(this.bathroomLightOffSwitch)) {
            this.bathroomLightOffSwitch.click();
        }
    }

    clickBathroomLightOffSwitch() {
        if (this.isButtonDisplayed(this.bathroomLightOnSwitch)) {
            this.bathroomLightOnSwitch.click();
        }
    }
}

module.exports = new BathroomTabPage('', '/bathroomTab');
