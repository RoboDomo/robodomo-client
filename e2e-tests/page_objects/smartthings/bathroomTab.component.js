import expect from 'expect';

/** BathroomTabComponent selenium page-object */
class BathroomTabComponent {
    get tabContent() { return $('//ion-content//div[@class="ion-page"]'); }

    get bathroomLightSwitch() { return this.tabContent.$('.//div[text()="Bathroom Light"]/parent::*//ion-toggle'); }
    get bathroomLightDimm() { return this.tabContent.$('.//div[text()="Bathroom Light"]/parent::*//ion-range'); }

    toggleBathroomLight(state) {
        if (this.bathroomLightSwitch.getAttribute('checked') === 'true' && !state) {
            this.bathroomLightSwitch.click();
        }
        if (this.bathroomLightSwitch.getAttribute('checked') === 'false' && state) {
            this.bathroomLightSwitch.click();
        }
    }

    validateBathroomLightState(state) {
        if (state === 'On')
            expect(this.bathroomLightSwitch.getAttribute('checked')).toEqual('true');
        else if (state === 'Off')
            expect(this.bathroomLightSwitch.getAttribute('checked')).toEqual('false');
    }

    validateBathroomLightDimmValue(value) {
        expect(this.bathroomLightDimm.getProperty('value')).toEqual(value.toString());
    }
}

module.exports = new BathroomTabComponent();
