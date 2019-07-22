/** OutsideTabComponent selenium page-object */
class OutsideTabComponent {
    get porchLightOnButton() { return $('//div[text()="Porch Light"]/parent::*//ion-segment-button[.="On"]'); }
    get porchLightOffButton() { return $('//div[text()="Porch Light"]/parent::*//ion-segment-button[.="Off"]'); }

    get outsideLightOnButton() { return $('//div[text()="Outside Light"]/parent::*//ion-segment-button[.="On"]'); }
    get outsideLightOffButton() { return $('//div[text()="Outside Light"]/parent::*//ion-segment-button[.="Off"]'); }

    get outdoorLightsOnButton() { return $('//div[text()="Outdoor Lights"]/parent::*//ion-segment-button[.="On"]'); }
    get outdoorLightsOffButton() { return $('//div[text()="Outdoor Lights"]/parent::*//ion-segment-button[.="Off"]'); }

    togglePorchLight() {
        if (this.porchLightOnButton.getProperty('checked') === 'true' && !state) {
            this.porchLightOffButton.click();
        }
        if (this.porchLightOffButton.getProperty('checked') === 'true' && state) {
            this.porchLightOnButton.click();
        }
    }

    toggleOutsideLight() {
        if (this.outsideLightOnButton.getProperty('checked') === 'true' && !state) {
            this.outsideLightOffButton.click();
        }
        if (this.outsideLightOffButton.getProperty('checked') === 'true' && state) {
            this.outsideLightOnButton.click();
        }
    }

    toggleOutdoorLights() {
        if (this.outdoorLightsOnButton.getProperty('checked') === 'true' && !state) {
            this.outdoorLightsOffButton.click();
        }
        if (this.outdoorLightsOffButton.getProperty('checked') === 'true' && state) {
            this.outdoorLightsOnButton.click();
        }
    }
}

module.exports = new OutsideTabComponent();
