import expect from 'expect';

/** OutsideTabComponent selenium page-object */
class OutsideTabComponent {
    constructor(parent) {
        this.parent = parent
    }

    get activeTab() { return this.parent.$('.//div[@class="ion-page"]'); }

    get porchLightOnButton() { return this.activeTab.$('.//div[text()="Porch Light"]/parent::*//ion-segment-button[.="On"]'); }
    get porchLightOffButton() { return this.activeTab.$('.//div[text()="Porch Light"]/parent::*//ion-segment-button[.="Off"]'); }
    get porchLightLi() { return this.porchLightOnButton.$('./ancestor::li')}

    get outsideLightOnButton() { return this.activeTab.$('.//div[text()="Outside Light"]/parent::*//ion-segment-button[.="On"]'); }
    get outsideLightOffButton() { return this.activeTab.$('.//div[text()="Outside Light"]/parent::*//ion-segment-button[.="Off"]'); }
    get outsideLightLi() { return this.outsideLightOnButton.$('./ancestor::li')}

    get outdoorLightsOnButton() { return this.activeTab.$('.//div[text()="Outdoor Lights"]/parent::*//ion-segment-button[.="On"]'); }
    get outdoorLightsOffButton() { return this.activeTab.$('.//div[text()="Outdoor Lights"]/parent::*//ion-segment-button[.="Off"]'); }
    get outdoorLightsLi() { return this.outdoorLightsOnButton.$('./ancestor::li')}

    togglePorchLight(state) {
        this.porchLightLi.waitForAnimation();
        if (this.porchLightOnButton.getAttribute('checked') === 'true' && !state) {
            this.porchLightOffButton.click();
        }
        if (this.porchLightOffButton.getAttribute('checked') === 'true' && state) {
            this.porchLightOnButton.click();
        }
    }

    toggleOutsideLight(state) {
        this.outsideLightLi.waitForAnimation();
        if (this.outsideLightOnButton.getAttribute('checked') === 'true' && !state) {
            this.outsideLightOffButton.click();
        }
        if (this.outsideLightOffButton.getAttribute('checked') === 'true' && state) {
            this.outsideLightOnButton.click();
        }
    }

    toggleOutdoorLights(state) {
        this.outdoorLightsLi.waitForAnimation();
        if (this.outdoorLightsOnButton.getAttribute('checked') === 'true' && !state) {
            this.outdoorLightsOffButton.click();
        }
        if (this.outdoorLightsOffButton.getAttribute('checked') === 'true' && state) {
            this.outdoorLightsOnButton.click();
        }
    }

    validatePorchLightState(state) {
        this.porchLightLi.waitForAnimation();
        if (state === 'off')
            expect(this.porchLightOffButton.getAttribute('checked')).toEqual('true');
        else if (state === 'on')
            expect(this.porchLightOnButton.getAttribute('checked')).toEqual('true');
    }

    validateOutsideLightState(state) {
        this.outsideLightLi.waitForAnimation();
        if (state === 'off')
            expect(this.outsideLightOffButton.getAttribute('checked')).toEqual('true');
        else if (state === 'on')
            expect(this.outsideLightOnButton.getAttribute('checked')).toEqual('true');
    }

    validateOutdoorLightsState(state) {
        this.outdoorLightsLi.waitForAnimation();
        if (state === 'off')
            expect(this.outdoorLightsOffButton.getAttribute('checked')).toEqual('true');
        else if (state === 'on')
            expect(this.outdoorLightsOnButton.getAttribute('checked')).toEqual('true');
    }
}

module.exports = OutsideTabComponent;
