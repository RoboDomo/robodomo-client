/** TheaterTabComponent selenium page-object */
class TheaterTabComponent {
    get ceilingFanLightSwitch() { return $('//div[text()="Ceiling Fan Light"]/parent::*//ion-toggle'); }
    get ceilingFanLightDimm() { return $('//div[text()="Ceiling Fan Light"]/parent::*//ion-range'); }

    get ceilingFanOffButton() { return $('//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Off"]'); }
    get ceilingFanLowButton() { return $('//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Low"]'); }
    get ceilingFanMediumButton() { return $('//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Medium"]'); }
    get ceilingFanHighButton() { return $('//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="High"]'); }

    get officeDimmerSwitch() { return $('//div[text()="Office Dimmer"]/parent::*//ion-toggle'); }
    get officeDimmerDimm() { return $('//div[text()="Office Dimmer"]/parent::*//ion-range'); }

    get officeLightSwitch() { return $('//div[text()="Office Light"]/parent::*//ion-toggle'); }
    get officeLightDimm() { return $('//div[text()="Office Light"]/parent::*//ion-range'); }

    get officeFanOffButton() { return $('//div[text()="Office Fan"]/parent::*//ion-segment-button[.="Off"]'); }
    get officeFanLowButton() { return $('//div[text()="Office Fan"]/parent::*//ion-segment-button[.="Low"]'); }
    get officeFanMediumButton() { return $('//div[text()="Office Fan"]/parent::*//ion-segment-button[.="Medium"]'); }
    get officeFanHighButton() { return $('//div[text()="Office Fan"]/parent::*//ion-segment-button[.="High"]'); }

    get entrywayLightsOnButton() { return $('//div[text()="Entryway Lights"]/parent::*//ion-segment-button[.="On"]'); }
    get entrywayLightsOffButton() { return $('//div[text()="Entryway Lights"]/parent::*//ion-segment-button[.="Off"]'); }

    get kitchenLightSwitch() { return $('//div[text()="Kitchen Light"]/parent::*//ion-toggle'); }
    get kitchenLightDimm() { return $('//div[text()="Kitchen Light"]/parent::*//ion-range'); }

    toggleCeilingFanLightSwitch(state) {
        if (this.ceilingFanLightSwitch.getAttribute('checked') === 'true' && !state) {
            this.ceilingFanLightSwitch.click();
        }
        if (this.ceilingFanLightSwitch.getAttribute('checked') === 'false' && state) {
            this.ceilingFanLightSwitch.click();
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

    clickKitchenLightSwitch(state) {
        if (this.kitchenLightSwitch.getAttribute('checked') === 'true' && !state) {
            this.kitchenLightSwitch.click();
        }
        if (this.kitchenLightSwitch.getAttribute('checked') === 'false' && state) {
            this.kitchenLightSwitch.click();
        }
    }

    clickOfficeDimmerSwitch(state) {
        if (this.officeDimmerSwitch.getAttribute('checked') === 'true' && !state) {
            this.officeDimmerSwitch.click();
        }
        if (this.officeDimmerSwitch.getAttribute('checked') === 'false' && state) {
            this.officeDimmerSwitch.click();
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

    clickOfficeLightSwitch(state) {
        if (this.officeLightSwitch.getAttribute('checked') === 'true' && !state) {
            this.officeLightSwitch.click();
        }
        if (this.officeLightSwitch.getAttribute('checked') === 'false' && state) {
            this.officeLightSwitch.click();
        }
    }
}

module.exports = new TheaterTabComponent();
