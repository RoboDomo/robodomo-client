import expect from 'expect';

/** BedroomTabComponent selenium page-object */
class BedroomTabComponent {
    constructor(parent) {
        this.parent = parent
    }

    get activeTab() { return this.parent.$('.//div[@class="ion-page"]'); }

    get bedroomLampOnButton() { return this.activeTab.$('.//div[text()="Bedroom Lamp"]/parent::*//ion-segment-button[.="On"]'); }
    get bedroomLampOffButton() { return this.activeTab.$('.//div[text()="Bedroom Lamp"]/parent::*//ion-segment-button[.="Off"]'); }
    get bedroomLampLi() { return this.bedroomLampOnButton.$('./ancestor::li')}

    get bedroomFanOffButton() { return this.activeTab.$('.//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="Off"]'); }
    get bedroomFanLowButton() { return this.activeTab.$('.//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="Low"]'); }
    get bedroomFanMediumButton() { return this.activeTab.$('.//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="Medium"]'); }
    get bedroomFanHighButton() { return this.activeTab.$('.//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="High"]'); }
    get bedroomFanLi() { return this.bedroomFanOffButton.$('./ancestor::li'); }

    get bedroomLightSwitch() { return this.activeTab.$('.//ion-label[text()="Bedroom Light"]/parent::*//ion-toggle'); }
    get bedroomLightDimm() { return this.activeTab.$('.//ion-label[text()="Bedroom Light"]/parent::*//ion-range'); }
    get bedroomLightLi() { return this.bedroomLightSwitch.$('./ancestor::li')}

    clickBedroomFanOffButton() {
        this.bedroomFanLi.waitForAnimation();
        this.bedroomFanOffButton.click();
    }

    clickBedroomFanLowButton() {
        this.bedroomFanLi.waitForAnimation();
        this.bedroomFanLowButton.click();
    }

    clickBedroomFanMediumButton() {
        this.bedroomFanLi.waitForAnimation();
        this.bedroomFanMediumButton.click();
    }

    clickBedroomFanHighButton() {
        this.bedroomFanLi.waitForAnimation();
        this.bedroomFanHighButton.click();
    }

    toggleBedroomLamp(state) {
        this.bedroomLampLi.waitForAnimation();
        if (this.bedroomLampOnButton.getAttribute('checked') === 'true' && !state) {
            this.bedroomLampOffButton.click();
        }
        if (this.bedroomLampOffButton.getAttribute('checked') === 'true' && state) {
            this.bedroomLampOnButton.click();
        }
    }

    toggleBedroomLight(state) {
        this.bedroomLightLi.waitForAnimation();
        if (this.bedroomLightSwitch.getAttribute('aria-checked') === 'true' && !state) {
            this.bedroomLightSwitch.click();
        }
        if (this.bedroomLightSwitch.getAttribute('aria-checked') === 'false' && state) {
            this.bedroomLightSwitch.click();
        }
    }

    validateBedroomFanState(state) {
        this.bedroomFanLi.waitForAnimation();
        if (state === 'off')
            expect(this.bedroomFanOffButton.getAttribute('checked')).toEqual('true');
        else if (state === 'low')
            expect(this.bedroomFanLowButton.getAttribute('checked')).toEqual('true');
        else if (state === 'medium')
            expect(this.bedroomFanMediumButton.getAttribute('checked')).toEqual('true');
        else if (state === 'high')
            expect(this.bedroomFanHighButton.getAttribute('checked')).toEqual('true');
    }

    validateBedroomLampState(state) {
        this.bedroomLampLi.waitForAnimation();
        if (state === 'off')
            expect(this.bedroomLampOffButton.getAttribute('checked')).toEqual('true');
        else if (state === 'on')
            expect(this.bedroomLampOnButton.getAttribute('checked')).toEqual('true');
    }

    validateBedroomLightState(state) {
        this.bedroomLightLi.waitForAnimation();
        if (state === 'off')
            expect(this.bedroomLightSwitch.getAttribute('aria-checked')).toEqual('false');
        else if (state === 'on')
            expect(this.bedroomLightSwitch.getAttribute('aria-checked')).toEqual('true');
    }

    validateBedroomLightDimmValue(value) {
        this.bedroomLightLi.waitForAnimation();
        expect(this.bedroomLightDimm.getAttribute('value')).toEqual(value.toString());
    }
}

module.exports = BedroomTabComponent;
