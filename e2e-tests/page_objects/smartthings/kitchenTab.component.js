import expect from 'expect';

/** KitchenTabComponent selenium page-object */
class KitchenTabComponent {
    get tabContent() { return $('//ion-content//div[@class="ion-page"]'); }

    get kitchenLightSwitch() { return this.tabContent.$('.//div[text()="Kitchen Light"]/parent::*//ion-toggle'); }
    get kitchenLightDimm() { return this.tabContent.$('.//div[text()="Kitchen Light"]/parent::*//ion-range'); }

    toggleKitchenLight(state) {
        if (this.kitchenLightSwitch.getAttribute('checked') === 'true' && !state) {
            this.kitchenLightSwitch.click();
        }
        if (this.kitchenLightSwitch.getAttribute('checked') === 'false' && state) {
            this.kitchenLightSwitch.click();
        }
    }

    validateKitchenLightState(state) {
        if (state === 'On')
            expect(this.kitchenLightSwitch.getAttribute('checked')).toEqual('true');
        else if (state === 'Off')
            expect(this.kitchenLightSwitch.getAttribute('checked')).toEqual('false');
    }

    validateKitchenLightDimmValue(value) {
        expect(this.kitchenLightDimm.getAttribute('value')).toEqual(value.toString());
    }
}

module.exports = new KitchenTabComponent();
