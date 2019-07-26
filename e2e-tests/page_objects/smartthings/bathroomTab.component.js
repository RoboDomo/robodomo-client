import expect from 'expect';

/** BathroomTabComponent selenium page-object */
class BathroomTabComponent {
    constructor(parent) {
        this.parent = parent
    }

    get activeTab() { return this.parent.$('.//div[@class="ion-page"]'); }

    get bathroomLightSwitch() { return this.activeTab.$('.//div[text()="Bathroom Light"]/parent::*//ion-toggle'); }
    get bathroomLightDimm() { return this.activeTab.$('.//div[text()="Bathroom Light"]/parent::*//ion-range'); }
    get bathroomLightLi() { return this.bathroomLightSwitch.$('./ancestor::li')}

    toggleBathroomLight(state) {
        this.bathroomLightLi.waitForAnimation();
        if (this.bathroomLightSwitch.getAttribute('aria-checked') === 'true' && !state) {
            this.bathroomLightSwitch.click();
        }
        if (this.bathroomLightSwitch.getAttribute('aria-checked') === 'false' && state) {
            this.bathroomLightSwitch.click();
        }
    }

    validateBathroomLightState(state) {
        if (state === 'Off')
            expect(this.bathroomLightSwitch.getAttribute('aria-checked')).toEqual('false');
        else if (state === 'On')
            expect(this.bathroomLightSwitch.getAttribute('aria-checked')).toEqual('true');
    }

    validateBathroomLightDimmValue(value) {
        expect(this.bathroomLightDimm.getProperty('value')).toEqual(value.toString());
    }
}

module.exports = BathroomTabComponent;
