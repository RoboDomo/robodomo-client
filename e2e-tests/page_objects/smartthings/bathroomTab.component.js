import expect from 'expect';

/** BathroomTabComponent selenium page-object */
class BathroomTabComponent {
    get tabPane() { return $('#smartthings-tabs-tabpane-6'); }

    get bathroomLightSwitch() { return $('//div[text()="Bathroom Light"]/parent::*//ion-toggle'); }
    get bathroomLightDimm() { return $('//div[text()="Bathroom Light"]/parent::*//ion-range'); }

    toggleBathroomLight(state) {
        if (this.bathroomLightSwitch.getProperty('checked') === true && !state) {
            this.bathroomLightSwitch.click();
        }
        if (this.bathroomLightSwitch.getProperty('checked') === false && state) {
            this.bathroomLightSwitch.click();
        }
    }

    validateBathroomLightState(state) {
        if (state === 'On')
            expect(this.bathroomLightSwitch.getProperty('checked')).toEqual(true);
        else if (state === 'Off')
            expect(this.bathroomLightSwitch.getProperty('checked')).toEqual(false);
    }

    validateBathroomLightDimmValue(value) {
        expect(this.bathroomLightDimm.getProperty('value')).toEqual(value.toString());
    }
}

module.exports = new BathroomTabComponent();
