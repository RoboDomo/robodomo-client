import SmartThingsPage from '../smartthings.page';

/** OfficeTabComponent selenium page-object */
class OfficeTabComponent {
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
        if (this.entrywayLightsOnButton.getProperty('checked') === 'true' && !state) {
            this.entrywayLightsOffButton.click();
        }
        if (this.entrywayLightsOffButton.getProperty('checked') === 'true' && state) {
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
            expect(this.entrywayLightsOffButton.getProperty('checked')).toEqual(true);
        else if (state === 'On')
            expect(this.entrywayLightsOnButton.getProperty('checked')).toEqual(true);
    }

    validateOfficeDimmValue(value) {
        expect(this.officeDimmerDimm.getAttribute('value')).toEqual(value.toString());
    }

    validateOfficeDimmerState(state) {
        if (state === 'On')
            expect(this.officeDimmerSwitch.getAttribute('checked')).toEqual('true');
        else if (state === 'Off')
            expect(this.officeDimmerSwitch.getAttribute('checked')).toEqual('false');
    }

    validateOfficeFanState(state) {
        if (state === 'Off')
            expect(this.officeFanOffButton.getProperty('checked')).toEqual(true);
        else if (state === 'Low')
            expect(this.officeFanLowButton.getProperty('checked')).toEqual(true);
        else if (state === 'Medium')
            expect(this.officeFanMediumButton.getProperty('checked')).toEqual(true);
        else if (state === 'high')
            expect(this.officeFanHighButton.getProperty('checked')).toEqual(true);
    }

    validateOfficeLightState(state) {
        if (state === 'On')
            expect(this.officeLightSwitch.getAttribute('checked')).toEqual('true');
        else if (state === 'Off')
            expect(this.officeLightSwitch.getAttribute('checked')).toEqual('false');
    }

    validateOfficeLightDimmValue(value) {
        expect(this.officeLightDimm.getAttribute('value')).toEqual(value.toString());
    }
}

module.exports = new OfficeTabComponent();
