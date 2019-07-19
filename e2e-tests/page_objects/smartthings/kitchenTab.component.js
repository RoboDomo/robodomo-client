/* eslint max-len: ['error', { 'ignoreComments': true, 'ignoreStrings': true, 'ignoreTrailingComments': true }] */
/* eslint lines-between-class-members: ["error", "always", { exceptAfterSingleLine: true }] */
/* eslint class-methods-use-this: [0] */

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
