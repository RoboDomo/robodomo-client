import expect from 'expect';

/** TheaterTabComponent selenium page-object */
class TheaterTabComponent {
    constructor(parent) {
        this.parent = parent
    }

    get activeTab() { return this.parent.$('.//div[@class="ion-page"]'); }

    get ceilingFanLightSwitch() { return this.activeTab.$('.//ion-label[text()="Ceiling Fan Light"]/parent::*//ion-toggle'); }
    get ceilingFanLightDimm() { return this.activeTab.$('.//ion-label[text()="Ceiling Fan Light"]/parent::*//ion-range'); }
    get ceilingFanLightLi() { return this.ceilingFanLightSwitch.$('./ancestor::li')}

    get ceilingFanOffButton() { return this.activeTab.$('.//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Off"]'); }
    get ceilingFanLowButton() { return this.activeTab.$('.//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Low"]'); }
    get ceilingFanMediumButton() { return this.activeTab.$('.//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Medium"]'); }
    get ceilingFanHighButton() { return this.activeTab.$('.//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="High"]'); }
    get ceilingFanLi() { return this.ceilingFanOffButton.$('./ancestor::li')}

    get entrywayLightsOnButton() { return this.activeTab.$('.//div[text()="Entryway Lights"]/parent::*//ion-segment-button[.="On"]'); }
    get entrywayLightsOffButton() { return this.activeTab.$('.//div[text()="Entryway Lights"]/parent::*//ion-segment-button[.="Off"]'); }
    get entrywayLightsLi() { return this.entrywayLightsOnButton.$('./ancestor::li')}

    clickCeilingFanOffButton() {
        this.ceilingFanLi.waitForAnimation();
        this.ceilingFanOffButton.click();
    }

    clickCeilingFanLowButton() {
        this.ceilingFanLi.waitForAnimation();
        this.ceilingFanLowButton.click();
    }

    clickCeilingFanMediumButton() {
        this.ceilingFanLi.waitForAnimation();
        this.ceilingFanMediumButton.click();
    }

    clickCeilingFanHighButton() {
        this.ceilingFanLi.waitForAnimation();
        this.ceilingFanHighButton.click();
    }

    toggleCeilingFanLight(state) {
        this.ceilingFanLightLi.waitForAnimation();
        if (this.ceilingFanLightSwitch.getAttribute('aria-checked') === 'true' && !state) {
            this.ceilingFanLightSwitch.click();
        }
        if (this.ceilingFanLightSwitch.getAttribute('aria-checked') === 'false' && state) {
            this.ceilingFanLightSwitch.click();
        }
    }

    toggleEntrywayLights(state) {
        this.entrywayLightsLi.waitForAnimation();
        if (this.entrywayLightsOnButton.getAttribute('checked') === 'true' && !state) {
            this.entrywayLightsOffButton.click();
        }
        if (this.entrywayLightsOffButton.getAttribute('checked') === 'true' && state) {
            this.entrywayLightsOnButton.click();
        }
    }

    validateCeilingFanState(state) {
        this.ceilingFanLi.waitForAnimation();
        if (state === 'off')
            expect(this.ceilingFanOffButton.getAttribute('checked')).toEqual('true');
        else if (state === 'low')
            expect(this.ceilingFanLowButton.getAttribute('checked')).toEqual('true');
        else if (state === 'medium')
            expect(this.ceilingFanMediumButton.getAttribute('checked')).toEqual('true');
        else if (state === 'high')
            expect(this.ceilingFanHighButton.getAttribute('checked')).toEqual('true');
    }

    validateCeilingFanLightDimmValue(value) {
        this.ceilingFanLightLi.waitForAnimation();
        expect(this.ceilingFanLightDimm.getAttribute('value')).toEqual(value.toString());
    }

    validateCeilingFanLightState(state) {
        this.ceilingFanLightLi.waitForAnimation();
        if (state === 'off')
            expect(this.ceilingFanLightSwitch.getAttribute('aria-checked')).toEqual('false');
        else if (state === 'on')
            expect(this.ceilingFanLightSwitch.getAttribute('aria-checked')).toEqual('true');
    }

    validateEntrywayLightsState(state) {
        this.entrywayLightsLi.waitForAnimation();
        if (state === 'off')
            expect(this.entrywayLightsOffButton.getAttribute('checked')).toEqual('true');
        else if (state === 'on')
            expect(this.entrywayLightsOnButton.getAttribute('checked')).toEqual('true');
    }
}

module.exports = TheaterTabComponent;
