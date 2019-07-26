import expect from 'expect';

/** TheaterTabComponent selenium page-object */
class TheaterTabComponent {
    get tabContent() { return $('//ion-content//div[@class="ion-page"]'); }

    get ceilingFanLightSwitch() { return this.tabContent.$('.//div[text()="Ceiling Fan Light"]/parent::*//ion-toggle'); }
    get ceilingFanLightDimm() { return this.tabContent.$('.//div[text()="Ceiling Fan Light"]/parent::*//ion-range'); }

    get ceilingFanOffButton() { return this.tabContent.$('.//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Off"]'); }
    get ceilingFanLowButton() { return this.tabContent.$('.//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Low"]'); }
    get ceilingFanMediumButton() { return this.tabContent.$('.//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Medium"]'); }
    get ceilingFanHighButton() { return this.tabContent.$('.//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="High"]'); }

    get entrywayLightsOnButton() { return this.tabContent.$('.//div[text()="Entryway Lights"]/parent::*//ion-segment-button[.="On"]'); }
    get entrywayLightsOffButton() { return this.tabContent.$('.//div[text()="Entryway Lights"]/parent::*//ion-segment-button[.="Off"]'); }

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
        if (this.entrywayLightsOnButton.getAttribute('checked') === 'true' && !state) {
            this.entrywayLightsOffButton.click();
        }
        if (this.entrywayLightsOffButton.getAttribute('checked') === 'true' && state) {
            this.entrywayLightsOnButton.click();
        }
    }

    validateCeilingFanState(state) {
        if (state === 'Off')
            expect(this.ceilingFanOffButton.getAttribute('checked')).toEqual('true');
        else if (state === 'Low')
            expect(this.ceilingFanLowButton.getAttribute('checked')).toEqual('true');
        else if (state === 'Medium')
            expect(this.ceilingFanMediumButton.getAttribute('checked')).toEqual('true');
        else if (state === 'high')
            expect(this.ceilingFanHighButton.getAttribute('checked')).toEqual('true');
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
            expect(this.entrywayLightsOffButton.getAttribute('checked')).toEqual('true');
        else if (state === 'On')
            expect(this.entrywayLightsOnButton.getAttribute('checked')).toEqual('true');
    }
}

module.exports = new TheaterTabComponent();
