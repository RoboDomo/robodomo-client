/* eslint max-len: ['error', { 'ignoreComments': true, 'ignoreStrings': true, 'ignoreTrailingComments': true }] */
/* eslint lines-between-class-members: ["error", "always", { exceptAfterSingleLine: true }] */
/* eslint class-methods-use-this: [0] */

/** BathroomTabComponent selenium page-object */
class BathroomTabComponent {
    get bathroomLightOnSwitch() { return $('//div[text()="Bathroom Light"]/parent::*//ion-toggle[@checked="true"]'); }
    get bathroomLightOffSwitch() { return $('//div[text()="Bathroom Light"]/parent::*//ion-toggle[@checked="false"]'); }

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

module.exports = new BathroomTabComponent();
