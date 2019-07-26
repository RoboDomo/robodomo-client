import expect from 'expect';

/** BedroomTabComponent selenium page-object */
class BedroomTabComponent {
    get tabContent() { return $('//ion-content//div[@class="ion-page"]'); }

    get bedroomLampOnButton() { return this.tabContent.$('.//div[text()="Bedroom Lamp"]/parent::*//ion-segment-button[.="On"]'); }
    get bedroomLampOffButton() { return this.tabContent.$('.//div[text()="Bedroom Lamp"]/parent::*//ion-segment-button[.="Off"]'); }

    get bedroomFanOffButton() { return this.tabContent.$('.//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="Off"]'); }
    get bedroomFanLowButton() { return this.tabContent.$('.//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="Low"]'); }
    get bedroomFanMediumButton() { return this.tabContent.$('.//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="Medium"]'); }
    get bedroomFanHighButton() { return this.tabContent.$('.//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="High"]'); }

    get bedroomLightSwitch() { return this.tabContent.$('.//div[text()="Bedroom Light"]/parent::*//ion-toggle'); }
    get bedroomLightDimm() { return this.tabContent.$('.//div[text()="Bedroom Light"]/parent::*//ion-range'); }

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

    toggleBedroomLight(state) {
        if (this.bedroomLightSwitch.getAttribute('checked') === 'true' && !state) {
            this.bedroomLightSwitch.click();
        }
        if (this.bedroomLightSwitch.getAttribute('checked') === 'false' && state) {
            this.bedroomLightSwitch.click();
        }
    }

    validateBedroomFanState(state) {
        if (state === 'Off')
            expect(this.bedroomFanOffButton.getAttribute('checked')).toEqual('true');
        else if (state === 'Low')
            expect(this.bedroomFanLowButton.getAttribute('checked')).toEqual('true');
        else if (state === 'Medium')
            expect(this.bedroomFanMediumButton.getAttribute('checked')).toEqual('true');
        else if (state === 'high')
            expect(this.bedroomFanHighButton.getAttribute('checked')).toEqual('true');
    }

    validateBedroomLampState(state) {
        if (state === 'Off')
            expect(this.bedroomLampOffButton.getAttribute('checked')).toEqual('true');
        else if (state === 'On')
            expect(this.bedroomLampOnButton.getAttribute('checked')).toEqual('true');
    }

    validateBedroomLightState(state) {
        if (state === 'Off')
            expect(this.bedroomLightSwitch.getAttribute('checked')).toEqual('false');
        else if (state === 'On')
            expect(this.bedroomLightSwitch.getAttribute('checked')).toEqual('true');
    }

    validateBedroomLightDimmValue(value) {
        expect(this.bedroomLightDimm.getAttribute('value')).toEqual(value.toString());
    }
}

module.exports = new BedroomTabComponent();
