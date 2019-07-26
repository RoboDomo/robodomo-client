import expect from 'expect';

/** KitchenTabComponent selenium page-object */
class KitchenTabComponent {
    constructor(parent) {
        this.parent = parent
    }

    get activeTab() { return this.parent.$('.//div[@class="ion-page"]'); }

    get kitchenLightSwitch() { return this.activeTab.$('.//div[text()="Kitchen Light"]/parent::*//ion-toggle'); }
    get kitchenLightDimm() { return this.activeTab.$('.//div[text()="Kitchen Light"]/parent::*//ion-range'); }
    get kitchenLightLi() { return this.kitchenLightSwitch.$('./ancestor::li')}

    toggleKitchenLight(state) {
        this.kitchenLightLi.waitForAnimation();
        if (this.kitchenLightSwitch.getAttribute('aria-checked') === 'true' && !state)
            this.kitchenLightSwitch.click();
        if (this.kitchenLightSwitch.getAttribute('aria-checked') === 'false' && state)
            this.kitchenLightSwitch.click();
    }

    validateKitchenLightState(state) {
        if (state === 'Off')
            expect(this.kitchenLightSwitch.getAttribute('aria-checked')).toEqual('false');
        else if (state === 'On')
            expect(this.kitchenLightSwitch.getAttribute('aria-checked')).toEqual('true');
    }

    validateKitchenLightDimmValue(value) {
        expect(this.kitchenLightDimm.getAttribute('value')).toEqual(value.toString());
    }
}

module.exports = KitchenTabComponent;
