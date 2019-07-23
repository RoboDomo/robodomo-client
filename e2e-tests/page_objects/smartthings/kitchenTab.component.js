import expect from 'expect';

/** KitchenTabComponent selenium page-object */
class KitchenTabComponent {
    get tabPane() { return $('#smartthings-tabs-tabpane-5'); }

    get kitchenLightSwitch() { return $('//div[text()="Kitchen Light"]/parent::*//ion-toggle'); }
    get kitchenLightDimm() { return $('//div[text()="Kitchen Light"]/parent::*//ion-range'); }

    toggleKitchenLight(state) {
        if (this.kitchenLightSwitch.getProperty('checked') === true && !state) {
            this.kitchenLightSwitch.click();
        }
        if (this.kitchenLightSwitch.getProperty('checked') === false && state) {
            this.kitchenLightSwitch.click();
        }
    }

    validateKitchenLightState(state) {
        if (state === 'On')
            expect(this.kitchenLightSwitch.getProperty('checked')).toEqual(true);
        else if (state === 'Off')
            expect(this.kitchenLightSwitch.getProperty('checked')).toEqual(false);
    }

    validateKitchenLightDimmValue(value) {
        expect(this.kitchenLightDimm.getAttribute('value')).toEqual(value.toString());
    }
}

module.exports = new KitchenTabComponent();
