import expect from 'expect';

/** TheaterTabComponent selenium page-object */
class TheaterTabComponent {
    get ceilingFanLightSwitch() { return $('//div[text()="Ceiling Fan Light"]/parent::*//ion-toggle'); }
    get ceilingFanLightDimm() { return $('//div[text()="Ceiling Fan Light"]/parent::*//ion-range'); }

    get ceilingFanOffButton() { return $('//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Off"]'); }
    get ceilingFanLowButton() { return $('//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Low"]'); }
    get ceilingFanMediumButton() { return $('//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Medium"]'); }
    get ceilingFanHighButton() { return $('//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="High"]'); }

    get entrywayLightsOnButton() { return $('//div[text()="Entryway Lights"]/parent::*//ion-segment-button[.="On"]'); }
    get entrywayLightsOffButton() { return $('//div[text()="Entryway Lights"]/parent::*//ion-segment-button[.="Off"]'); }

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

    toggleCeilingFanLight(state) {
        if (this.ceilingFanLightSwitch.getAttribute('checked') === 'true' && !state) {
            this.ceilingFanLightSwitch.click();
        }
        if (this.ceilingFanLightSwitch.getAttribute('checked') === 'false' && state) {
            this.ceilingFanLightSwitch.click();
        }
    }

    toggleEntrywayLights(state) {
        if (this.entrywayLightsOnButton.getProperty('checked') === 'true' && !state) {
            this.entrywayLightsOffButton.click();
        }
        if (this.entrywayLightsOffButton.getProperty('checked') === 'true' && state) {
            this.entrywayLightsOnButton.click();
        }
    }

    validateCeilingFanState(state) {
        if (state === 'Off')
            expect(this.ceilingFanOffButton.getProperty('checked')).toEqual(true);
        else if (state === 'Low')
            expect(this.ceilingFanLowButton.getProperty('checked')).toEqual(true);
        else if (state === 'Medium')
            expect(this.ceilingFanMediumButton.getProperty('checked')).toEqual(true);
        else if (state === 'high')
            expect(this.ceilingFanHighButton.getProperty('checked')).toEqual(true);
    }

    validateCeilingFanLightDimmValue(value) {
        expect(this.ceilingFanLightDimm.getAttribute('value')).toEqual(value.toString());
    }

    validateCeilingFanLightState(state) {
        if (state === 'On')
            expect(this.ceilingFanLightSwitch.getAttribute('checked')).toEqual('true');
        else if (state === 'Off')
            expect(this.ceilingFanLightSwitch.getAttribute('checked')).toEqual('false');
    }

    validateEntrywayLightsState(state) {
        if (state === 'Off')
            expect(this.entrywayLightsOffButton.getProperty('checked')).toEqual(true);
        else if (state === 'On')
            expect(this.entrywayLightsOnButton.getProperty('checked')).toEqual(true);
    }
}

module.exports = new TheaterTabComponent();
