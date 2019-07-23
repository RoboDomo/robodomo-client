/** BathroomTabComponent selenium page-object */
class BathroomTabComponent {
    get bathroomLightSwitch() {
        return $('//div[text()="Bathroom Light"]/parent::*//ion-toggle');
    }
    get bathroomLightDimm() {
        return $('//div[text()="Bathroom Light"]/parent::*//ion-range');
    }

    toggleBathroomLight(state) {
        if (this.bathroomLightSwitch.getAttribute('checked') === 'true' && !state) {
            this.bathroomLightSwitch.click();
        }
        if (this.bathroomLightSwitch.getAttribute('checked') === 'false' && state) {
            this.bathroomLightSwitch.click();
        }
    }

    validatBathroomLightState(state) {
        if (state === 'On') expect(this.bathroomLightSwitch.getAttribute('checked')).toEqual('true');
        else if (state === 'Off') expect(this.bathroomLightSwitch.getAttribute('checked')).toEqual('false');
    }

    validateBathroomLightDimmValue(value) {
        expect(this.bathroomLightDimm.getAttribute('value')).toEqual(value.toString());
    }
}

module.exports = new BathroomTabComponent();
