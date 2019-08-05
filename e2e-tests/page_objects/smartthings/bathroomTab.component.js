import expect from 'expect';

/** BathroomTabComponent selenium page-object */
class BathroomTabComponent {
    constructor(parent) {
        this.parent = parent
    }

    get activeTab() { return this.parent.$('.//div[@class="ion-page"]'); }

    get bathroomLightSwitch() { return this.activeTab.$('.//ion-card[contains(., "Bathroom Light")]//ion-toggle'); }
    get bathroomLightDimm() { return this.activeTab.$('.//ion-card[contains(., "Bathroom Light")]//ion-range'); }
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
        this.bathroomLightLi.waitForAnimation();
        if (state === 'off')
            expect(this.bathroomLightSwitch.getAttribute('aria-checked')).toEqual('false');
        else if (state === 'on')
            expect(this.bathroomLightSwitch.getAttribute('aria-checked')).toEqual('true');
    }

    validateBathroomLightDimmValue(value) {
        this.bathroomLightLi.waitForAnimation();
        expect(this.bathroomLightDimm.getProperty('value').toString()).toEqual(value.toString());
    }
}

module.exports = BathroomTabComponent;
