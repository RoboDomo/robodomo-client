import expect from 'expect';

/** BedroomTabComponent selenium page-object */
class BedroomTabComponent {
    get tabPane() { return $('#smartthings-tabs-tabpane-4'); }

    get bedroomLampOnButton() { return $('//div[text()="Bedroom Lamp"]/parent::*//ion-segment-button[.="On"]'); }
    get bedroomLampOffButton() { return $('//div[text()="Bedroom Lamp"]/parent::*//ion-segment-button[.="Off"]'); }

    get bedroomFanOffButton() { return $('//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="Off"]'); }
    get bedroomFanLowButton() { return $('//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="Low"]'); }
    get bedroomFanMediumButton() { return $('//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="Medium"]'); }
    get bedroomFanHighButton() { return $('//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="High"]'); }

    get bedroomLightSwitch() { return $('//div[text()="Bedroom Light"]/parent::*//ion-toggle'); }
    get bedroomLightDimm() { return $('//div[text()="Bedroom Light"]/parent::*//ion-range'); }

    clickBedroomFanOffButton() {
        this.bedroomFanOffButton.click();
    }

    clickBedroomFanLowButton() {
        this.bedroomFanLowButton.click();
    }

    clickBedroomFanMediumButton() {
        this.bedroomFanMediumButton.click();
    }

    clickBedroomFanHighButton() {
        this.bedroomFanHighButton.click();
    }

    toggleBedroomLamp(state) {
        if (this.bedroomLampOnButton.getProperty('checked') === true && !state) {
            this.bedroomLampOffButton.click();
        }
        if (this.bedroomLampOffButton.getProperty('checked') === true && state) {
            this.bedroomLampOnButton.click();
        }
    }

    toggleBedroomLight(state) {
        if (this.bedroomLightSwitch.getProperty('checked') === true && !state) {
            this.bedroomLightSwitch.click();
        }
        if (this.bedroomLightSwitch.getProperty('checked') === false && state) {
            this.bedroomLightSwitch.click();
        }
    }

    validateBedroomFanState(state) {
        if (state === 'Off')
            expect(this.bedroomFanOffButton.getProperty('checked')).toEqual(true);
        else if (state === 'Low')
            expect(this.bedroomFanLowButton.getProperty('checked')).toEqual(true);
        else if (state === 'Medium')
            expect(this.bedroomFanMediumButton.getProperty('checked')).toEqual(true);
        else if (state === 'high')
            expect(this.bedroomFanHighButton.getProperty('checked')).toEqual(true);
    }

    validateBedroomLampState(state) {
        if (state === 'Off')
            expect(this.bedroomLampOffButton.getProperty('checked')).toEqual(true);
        else if (state === 'On')
            expect(this.bedroomLampOnButton.getProperty('checked')).toEqual(true);
    }

    validateBedroomLightState(state) {
        if (state === 'Off')
            expect(this.bedroomLightSwitch.getProperty('checked')).toEqual(false);
        else if (state === 'On')
            expect(this.bedroomLightSwitch.getProperty('checked')).toEqual(true);
    }

    validateBedroomLightDimmValue(value) {
        expect(this.bedroomLightDimm.getAttribute('value')).toEqual(value.toString());
    }
}

module.exports = new BedroomTabComponent();
