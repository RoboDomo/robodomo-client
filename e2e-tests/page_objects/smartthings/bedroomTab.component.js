/** BedroomTabComponent selenium page-object */
class BedroomTabComponent {
    get bedroomLampOnButton() { return $('//div[text()="Bedroom Lamp"]/parent::*//ion-segment-button[.="On"]'); }
    get bedroomLampOffButton() { return $('//div[text()="Bedroom Lamp"]/parent::*//ion-segment-button[.="Off"]'); }

    get bedroomFanOffButton() { return $('//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="Off"]'); }
    get bedroomFanLowButton() { return $('//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="Low"]'); }
    get bedroomFanMediumButton() { return $('//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="Medium"]'); }
    get bedroomFanHighButton() { return $('//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="High"]'); }

    get bedroomLightSwitch() { return $('//div[text()="Bedroom Light"]/parent::*//ion-toggle[@checked="true"]'); }
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
        if (this.bedroomLampOnButton.getAttribute('checked') === 'true' && !state) {
            this.bedroomLampOffButton.click();
        }
        if (this.bedroomLampOffButton.getAttribute('checked') === 'true' && state) {
            this.bedroomLampOnButton.click();
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

    toggleBedroomLight(state) {
        if (this.bedroomLightSwitch.getAttribute('checked') === 'true' && !state) {
            this.bedroomLightSwitch.click();
        }
        if (this.bedroomLightSwitch.getAttribute('checked') === 'false' && state) {
            this.bedroomLightSwitch.click();
        }
    }

    validateBedroomLampLightState(state) {
        if (state === 'On')
            expect(this.bedroomLightSwitch.getAttribute('checked')).toEqual('true');
        else if (state === 'Off')
            expect(this.bedroomLightSwitch.getAttribute('checked')).toEqual('false');
    }

    validateBedroomLightState(state) {
        if (state === 'Off')
            expect(this.bedroomLampOffButton.getProperty('checked')).toEqual(true);
        else if (state === 'On')
            expect(this.bedroomLampOnButton.getProperty('checked')).toEqual(true);
    }

    validateBedroomLightDimmValue(value) {
        expect(this.bedroomLightDimm.getAttribute('value')).toEqual(value.toString());
    }
}

module.exports = new BedroomTabComponent();
