import expect from 'expect';

/** OfficeTabComponent selenium page-object */
class OfficeTabComponent {
    get TabPane() { return $('#smartthings-tabs-tabpane-2'); }

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

    toggleEntrywayLights(state) {
        if (this.entrywayLightsOnButton.getAttribute('checked') === 'true' && !state) {
            this.entrywayLightsOffButton.click();
        }
        if (this.entrywayLightsOffButton.getAttribute('checked') === 'true' && state) {
            this.entrywayLightsOnButton.click();
        }
    }

    toggleOfficeDimmer(state) {
        if (this.officeDimmerSwitch.getAttribute('checked') === 'true' && !state) {
            this.officeDimmerSwitch.click();
        }
        if (this.officeDimmerSwitch.getAttribute('checked') === 'false' && state) {
            this.officeDimmerSwitch.click();
        }
    }

    toggleOfficeLight(state) {
        if (this.officeLightSwitch.getAttribute('checked') === 'true' && !state) {
            this.officeLightSwitch.click();
        }
        if (this.officeLightSwitch.getAttribute('checked') === 'false' && state) {
            this.officeLightSwitch.click();
        }
    }

    validateEntrywayLightsState(state) {
        if (state === 'Off')
            expect(this.entrywayLightsOffButton.getAttribute('checked')).toEqual('true');
        else if (state === 'On')
            expect(this.entrywayLightsOnButton.getAttribute('checked')).toEqual('true');
    }

    validateOfficeDimmValue(value) {
        expect(this.officeDimmerDimm.getAttribute('value')).toEqual(value.toString());
    }

    validateOfficeDimmerState(state) {
        if (state === 'Off')
            expect(this.officeDimmerSwitch.getAttribute('checked')).toEqual('false');
        else if (state === 'On')
            expect(this.officeDimmerSwitch.getAttribute('checked')).toEqual('true');
    }

    validateOfficeFanState(state) {
        if (state === 'Off')
            expect(this.officeFanOffButton.getAttribute('checked')).toEqual('true');
        else if (state === 'Low')
            expect(this.officeFanLowButton.getAttribute('checked')).toEqual('true');
        else if (state === 'Medium')
            expect(this.officeFanMediumButton.getAttribute('checked')).toEqual('true');
        else if (state === 'high')
            expect(this.officeFanHighButton.getAttribute('checked')).toEqual('true');
    }

    validateOfficeLightState(state) {
        if (state === 'Off')
            expect(this.officeLightSwitch.getAttribute('checked')).toEqual('false');
        else if (state === 'On')
            expect(this.officeLightSwitch.getAttribute('checked')).toEqual('true');
    }

    validateOfficeLightDimmValue(value) {
        expect(this.officeLightDimm.getAttribute('value')).toEqual(value.toString());
    }
}

module.exports = new OfficeTabComponent();
