/** TheaterTabComponent selenium page-object */
class TheaterTabComponent {
    get ceilingFanLightOnSwitch() { return $('//div[text()="Ceiling Fan Light"]/parent::*//ion-toggle[@checked="true"]'); }
    get ceilingFanLightOffSwitch() { return $('//div[text()="Ceiling Fan Light"]/parent::*//ion-toggle[@checked="false"]'); }

    get ceilingFanOffButton() { return $('//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Off"]'); }
    get ceilingFanLowButton() { return $('//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Low"]'); }
    get ceilingFanMediumButton() { return $('//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Medium"]'); }
    get ceilingFanHighButton() { return $('//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="High"]'); }

    get officeDimmerOnSwitch() { return $('//div[text()="Office Dimmer"]/parent::*//ion-toggle[@checked="true"]'); }
    get officeDimmerOffSwitch() { return $('//div[text()="Office Dimmer"]/parent::*//ion-toggle[@checked="false"]'); }

    get officeLightOnSwitch() { return $('//div[text()="Office Light"]/parent::*//ion-toggle[@checked="true"]'); }
    get officeLightOffSwitch() { return $('//div[text()="Office Light"]/parent::*//ion-toggle[@checked="false"]'); }

    get officeFanOffButton() { return $('//div[text()="Office Fan"]/parent::*//ion-segment-button[.="Off"]'); }
    get officeFanLowButton() { return $('//div[text()="Office Fan"]/parent::*//ion-segment-button[.="Low"]'); }
    get officeFanMediumButton() { return $('//div[text()="Office Fan"]/parent::*//ion-segment-button[.="Medium"]'); }
    get officeFanHighButton() { return $('//div[text()="Office Fan"]/parent::*//ion-segment-button[.="High"]'); }

    get entrywayLightsOnButton() { return $('//div[text()="Entryway Lights"]/parent::*//ion-segment-button[.="On"]'); }
    get entrywayLightsOffButton() { return $('//div[text()="Entryway Lights"]/parent::*//ion-segment-button[.="Off"]'); }

    get kitchenLightOnSwitch() { return $('//div[text()="Kitchen Light"]/parent::*//ion-toggle[@checked="true"]'); }
    get kitchenLightOffSwitch() { return $('//div[text()="Kitchen Light"]/parent::*//ion-toggle[@checked="false"]'); }

    clickCeilingFanLightOnSwitch() {
        if (this.ceilingFanLightOffSwitch.isDisplayed()) {
            this.ceilingFanLightOffSwitch.click();
        }
    }

    clickCeilingFanLightOffSwitch() {
        if (this.ceilingFanLightOnSwitch.isDisplayed()) {
            this.ceilingFanLightOnSwitch.click();
        }
    }

    clickCeilingFanOffButton() {
        this.ceilingFanOffButton.click();
    }

    clickCeilingFanLowButton() {
        this.ceilingFanLowButton.click();
    }

    clickCeilingFanMediumButton() {
        this.ceilingFanMediumButton.click();
    }

    clickCeilingFanHighButton() {
        this.ceilingFanHighButton.click();
    }

    clickEntrywayLightsOnButton() {
        this.entrywayLightsOnButton.click();
    }

    clickEntrywayLightsOffButton() {
        this.entrywayLightsOffButton.click();
    }

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

    clickOfficeDimmerOnSwitch() {
        if (this.officeDimmerOffSwitch.isDisplayed()) {
            this.officeDimmerOffSwitch.click();
        }
    }

    clickOfficeDimmerOffSwitch() {
        if (this.officeDimmerOnSwitch.isDisplayed()) {
            this.officeDimmerOnSwitch.click();
        }
    }

    clickOfficeFanOffButton() {
        this.officeFanOffButton.click();
    }

    clickOfficeFanLowButton() {
        this.officeFanLowButton.click();
    }

    clickOfficeFanMediumButton() {
        this.officeFanMediumButton.click();
    }

    clickOfficeFanHighButton() {
        this.officeFanHighButton.click();
    }

    clickOfficeLightOnSwitch() {
        if (this.officeLightOffSwitch.isDisplayed()) {
            this.officeLightOffSwitch.click();
        }
    }

    clickOfficeLightOffSwitch() {
        if (this.officeLightOnSwitch.isDisplayed()) {
            this.officeLightOnSwitch.click();
        }
    }
}

module.exports = new TheaterTabComponent();
