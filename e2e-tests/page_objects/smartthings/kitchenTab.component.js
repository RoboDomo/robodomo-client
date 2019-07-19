/** KitchenTabComponent selenium page-object */
class KitchenTabComponent {
    get kitchenLightOnSwitch() { return $('//div[text()="Kitchen Light"]/parent::*//ion-toggle[@checked="true"]'); }
    get kitchenLightOffSwitch() { return $('//div[text()="Kitchen Light"]/parent::*//ion-toggle[@checked="false"]'); }

    clickKitchenLightOnSwitch() {
        if (this.kitchenLightOffSwitch.isDisplayed()) {
            this.kitchenLightOffSwitch.click();
        }
    }

    clickKitchenLightOffSwitch() {
        if (this.kitchenLightOnSwitch.isDisplayed()) {
            this.kitchenLightOnSwitch.click();
        }
    }
}

module.exports = new KitchenTabComponent();
