import expect from 'expect';

/** OutsideTabComponent selenium page-object */
class OutsideTabComponent {
    get tabPane() { return $('#smartthings-tabs-tabpane-7'); }

    get porchLightOnButton() { return $('//div[text()="Porch Light"]/parent::*//ion-segment-button[.="On"]'); }
    get porchLightOffButton() { return $('//div[text()="Porch Light"]/parent::*//ion-segment-button[.="Off"]'); }

    get outsideLightOnButton() { return $('//div[text()="Outside Light"]/parent::*//ion-segment-button[.="On"]'); }
    get outsideLightOffButton() { return $('//div[text()="Outside Light"]/parent::*//ion-segment-button[.="Off"]'); }

    get outdoorLightsOnButton() { return $('//div[text()="Outdoor Lights"]/parent::*//ion-segment-button[.="On"]'); }
    get outdoorLightsOffButton() { return $('//div[text()="Outdoor Lights"]/parent::*//ion-segment-button[.="Off"]'); }

    togglePorchLight(state) {
        if (this.porchLightOnButton.getAttribute('checked') === 'true' && !state) {
            this.porchLightOffButton.click();
        }
        if (this.porchLightOffButton.getAttribute('checked') === 'true' && state) {
            this.porchLightOnButton.click();
        }
    }

    toggleOutsideLight(state) {
        if (this.outsideLightOnButton.getAttribute('checked') === 'true' && !state) {
            this.outsideLightOffButton.click();
        }
        if (this.outsideLightOffButton.getAttribute('checked') === 'true' && state) {
            this.outsideLightOnButton.click();
        }
    }

    toggleOutdoorLights(state) {
        if (this.outdoorLightsOnButton.getAttribute('checked') === 'true' && !state) {
            this.outdoorLightsOffButton.click();
        }
        if (this.outdoorLightsOffButton.getAttribute('checked') === 'true' && state) {
            this.outdoorLightsOnButton.click();
        }
    }

    validatePorchLightState(state) {
        if (state === 'Off')
            expect(this.porchLightOffButton.getAttribute('checked')).toEqual('true');
        else if (state === 'On')
            expect(this.porchLightOnButton.getAttribute('checked')).toEqual('true');
    }

    validateOutsideLightState(state) {
        if (state === 'Off')
            expect(this.outsideLightOffButton.getAttribute('checked')).toEqual('true');
        else if (state === 'On')
            expect(this.outsideLightOnButton.getAttribute('checked')).toEqual('true');
    }

    validateOutdoorLightsState(state) {
        if (state === 'Off')
            expect(this.outdoorLightsOffButton.getAttribute('checked')).toEqual('true');
        else if (state === 'On')
            expect(this.outdoorLightsOnButton.getAttribute('checked')).toEqual('true');
    }
}

module.exports = new OutsideTabComponent();
