import expect from 'expect';

/** OfficeTabComponent selenium page-object */
class OfficeTabComponent {
    constructor(parent) {
        this.parent = parent
    }

    get activeTab() { return this.parent.$('.//div[@class="ion-page"]'); }

    get officeDimmerSwitch() { return this.activeTab.$('.//ion-label[text()="Office Dimmer"]/parent::*//ion-toggle'); }
    get officeDimmerDimm() { return this.activeTab.$('.//ion-label[text()="Office Dimmer"]/parent::*//ion-range'); }
    get officeDimmerLi() { return this.officeDimmerSwitch.$('./ancestor::li')}

    get officeLightSwitch() { return this.activeTab.$('.//ion-label[text()="Office Light"]/parent::*//ion-toggle'); }
    get officeLightDimm() { return this.activeTab.$('.//ion-label[text()="Office Light"]/parent::*//ion-range'); }
    get officeLightLi() { return this.officeLightSwitch.$('./ancestor::li')}

    get officeFanOffButton() { return this.activeTab.$('.//div[text()="Office Fan"]/parent::*//ion-segment-button[.="Off"]'); }
    get officeFanLowButton() { return this.activeTab.$('.//div[text()="Office Fan"]/parent::*//ion-segment-button[.="Low"]'); }
    get officeFanMediumButton() { return this.activeTab.$('.//div[text()="Office Fan"]/parent::*//ion-segment-button[.="Medium"]'); }
    get officeFanHighButton() { return this.activeTab.$('.//div[text()="Office Fan"]/parent::*//ion-segment-button[.="High"]'); }
    get officeFanLi() { return this.officeFanOffButton.$('./ancestor::li')}

    clickOfficeFanOffButton() {
        this.officeFanLi.waitForAnimation();
        this.officeFanOffButton.click();
    }

    clickOfficeFanLowButton() {
        this.officeFanLi.waitForAnimation();
        this.officeFanLowButton.click();
    }

    clickOfficeFanMediumButton() {
        this.officeFanLi.waitForAnimation();
        this.officeFanMediumButton.click();
    }

    clickOfficeFanHighButton() {
        this.officeFanLi.waitForAnimation();
        this.officeFanHighButton.click();
    }

    toggleOfficeDimmer(state) {
        this.officeDimmerLi.waitForAnimation();
        if (this.officeDimmerSwitch.getAttribute('aria-checked') === 'true' && !state)
            this.officeDimmerSwitch.click();
        if (this.officeDimmerSwitch.getAttribute('aria-checked') === 'false' && state)
            this.officeDimmerSwitch.click();
    }

    toggleOfficeLight(state) {
        this.officeLightLi.waitForAnimation();
        if (this.officeLightSwitch.getAttribute('aria-checked') === 'true' && !state)
            this.officeLightSwitch.click();
        if (this.officeLightSwitch.getAttribute('aria-checked') === 'false' && state)
            this.officeLightSwitch.click();
    }

    validateOfficeDimmValue(value) {
        this.officeDimmerLi.waitForAnimation();
        expect(this.officeDimmerDimm.getAttribute('value')).toEqual(value.toString());
    }

    validateOfficeDimmerState(state) {
        this.officeDimmerLi.waitForAnimation();
        if (state === 'off')
            expect(this.officeDimmerSwitch.getAttribute('aria-checked')).toEqual('false');
        else if (state === 'on')
            expect(this.officeDimmerSwitch.getAttribute('aria-checked')).toEqual('true');
    }

    validateOfficeFanState(state) {
        this.officeFanLi.waitForAnimation();
        if (state === 'off')
            expect(this.officeFanOffButton.getAttribute('checked')).toEqual('true');
        else if (state === 'low')
            expect(this.officeFanLowButton.getAttribute('checked')).toEqual('true');
        else if (state === 'medium')
            expect(this.officeFanMediumButton.getAttribute('checked')).toEqual('true');
        else if (state === 'high')
            expect(this.officeFanHighButton.getAttribute('checked')).toEqual('true');
    }

    validateOfficeLightState(state) {
        this.officeLightLi.waitForAnimation();
        if (state === 'off')
            expect(this.officeLightSwitch.getAttribute('aria-checked')).toEqual('false');
        else if (state === 'on')
            expect(this.officeLightSwitch.getAttribute('aria-checked')).toEqual('true');
    }

    validateOfficeLightDimmValue(value) {
        this.officeLightLi.waitForAnimation();
        expect(this.officeLightDimm.getAttribute('value')).toEqual(value.toString());
    }
}

module.exports = OfficeTabComponent;
