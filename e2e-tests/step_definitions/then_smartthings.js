import expect from 'expect';
import { Then } from 'cucumber';
import SmartThingsPage from '../page_objects/smartthings.page';
import DashboardPage from '../page_objects/dashboard.page';

Then(/^SmartThings (Ceiling Fan Light|Ceiling Fan|Office Dimmer|Office Light|Office Fan|Entryway Lights|Kitchen Light|Bathroom Light|Bedroom Lamp|Bedroom Fan|Bedroom Light|Porch Light|Outside Light|Outdoor Lights) button is in (On|Off|Low|Medium|High) state$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Ceiling Fan Light':
            SmartThingsPage.getTheaterTab().validateCeilingFanLightState(state);
            break;
        case 'Ceiling Fan':
            SmartThingsPage.getTheaterTab().validateCeilingFanState(state);
            break;
        case 'Office Dimmer':
            SmartThingsPage.getTheaterTab().validateOfficeDimmerState(state);
            break;
        case 'Office Light':
            SmartThingsPage.getTheaterTab().validateOfficeLightState(state);
            break;
        case 'Office Fan':
            SmartThingsPage.getTheaterTab().validateOfficeFanState(state);
            break;
        case 'Entryway Lights':
            SmartThingsPage.getTheaterTab().validateEntrywayLightsState(state);
            break;
        case 'Kitchen Light':
            SmartThingsPage.getTheaterTab().validateKitchenLightState(state);
            break;
        default:
            break;
    }

});

Then(/^SmartThings (Ceiling Fan Light|Ceiling Fan|Office Dimmer|Office Light|Office Fan|Entryway Lights|Kitchen Light|Bathroom Light|Bedroom Lamp|Bedroom Fan|Bedroom Light|Porch Light|Outside Light|Outdoor Lights) button is in (On|Off|Low|Medium|High) state$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Office Dimmer':
            SmartThingsPage.getOfficeTab().validateOfficeDimmerState(state);
            break;
        case 'Office Light':
            SmartThingsPage.getOfficeTab().validateOfficeLightState(state);
            break;
        case 'Office Fan':
            SmartThingsPage.getOfficeTab().validateOfficeFanState(state);
            break;
        case 'Entryway Lights':
            SmartThingsPage.getOfficeTab().validateEntrywayLightsState(state);
            break;
        default:
            break;
    }
});

Then(/^SmartThings (Ceiling Fan Light|Ceiling Fan|Office Dimmer|Office Light|Office Fan|Entryway Lights|Kitchen Light|Bathroom Light|Bedroom Lamp|Bedroom Fan|Bedroom Light|Porch Light|Outside Light|Outdoor Lights) button is in (On|Off|Low|Medium|High) state$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Office Dimmer':
            SmartThingsPage.getTheaterTab().validateOfficeDimmerState(state);
            break;
        case 'Office Light':
            SmartThingsPage.getTheaterTab().validateOfficeLightState(state);
            break;
        case 'Office Fan':
            SmartThingsPage.getTheaterTab().validateOfficeFanState(state);
            break;
        case 'Entryway Lights':
            SmartThingsPage.getTheaterTab().validateEntrywayLightsState(state);
            break;
        case 'Kitchen Light':
            SmartThingsPage.getTheaterTab().validateKitchenLightState(state);
            break;
        case 'Bathroom Light':
            SmartThingsPage.getTheaterTab().validateBathroomLightState(state);
            switch (state) {
                case 'On':
                    SmartThingsPage.getBedroomTabPage().bathroomLightOnSwitch.waitForButtonToBeDisplayed();
                    break;
                case 'Off':
                    SmartThingsPage.getBedroomTabPage().bathroomLightOffSwitch.waitForButtonToBeDisplayed();
                    break;
                default:
                    break;
            }
            break;
        case 'Bedroom Fan':
            switch (state) {
                case 'Off':
                    SmartThingsPage.getBedroomTabPage().bedroomFanOffButton.isButtonEnabled();
                    break;
                case 'Low':
                    SmartThingsPage.getBedroomTabPage().bedroomFanLowButton.isButtonEnabled();
                    break;
                case 'Medium':
                    SmartThingsPage.getBedroomTabPage().bedroomFanMediumButton.isButtonEnabled();
                    break;
                case 'High':
                    SmartThingsPage.getBedroomTabPage().bedroomFanHighButton.isButtonEnabled();
                    break;
                default:
                    break;
            }
            break;
        case 'Bedroom Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.getBedroomTabPage().bedroomLightOnSwitch.waitForButtonToBeDisplayed();
                    break;
                case 'Off':
                    SmartThingsPage.getBedroomTabPage().bedroomLightOffSwitch.waitForButtonToBeDisplayed();
                    break;
                default:
                    break;
            }
            break;
        case 'Bedroom Lamp':
            switch (state) {
                case 'On':
                    SmartThingsPage.getBedroomTabPage().bedroomLampOnButton.isButtonEnabled();
                    break;
                case 'Off':
                    SmartThingsPage.getBedroomTabPage().bedroomLampOffButton.isButtonEnabled();
                    break;
                default:
                    break;
            }
            break;
        case 'Porch Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.getOutsideTabPage().porchLightOnButton.isButtonEnabled();
                    break;
                case 'Off':
                    SmartThingsPage.getOutsideTabPage().porchLightOffButton.isButtonEnabled();
                    break;
                default:
                    break;
            }
            break;
        case 'Outside Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.getOutsideTabPage().outsideLightOnButton.isButtonEnabled();
                    break;
                case 'Off':
                    SmartThingsPage.getOutsideTabPage().outsideLightOffButton.isButtonEnabled();
                    break;
                default:
                    break;
            }
            break;
        case 'Outdoor Lights':
            switch (state) {
                case 'On':
                    SmartThingsPage.getOutsideTabPage().outdoorLightsOnButton.isButtonEnabled();
                    break;
                case 'Off':
                    SmartThingsPage.getOutsideTabPage().outdoorLightsOffButton.isButtonEnabled();
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
});

Then(/^SmartThings (Ceiling Fan Light|Office Dimmer|Office Light|Kitchen Light) dimmer value is (\w+) on SmartThings page$/, (dimmerName, value) => {
    switch (dimmerName) {
        case 'Ceiling Fan Light':
            SmartThingsPage.getTheaterTab().validateCeilingFanLightDimmValue(value);
            break;
        case 'Office Dimmer':
            SmartThingsPage.getOfficeTab().validateOfficeDimmValue();
            break;
        case 'Office Light':
            SmartThingsPage.getOfficeTab().validateOfficeLightDimmValue()
            break;
        case 'Kitchen Light':
            expect(SmartThingsPage.getTheaterTab().kitchenLightDimm.getAttribute('value')).toEqual(value.toString());
            break;
        default:
            break;
    }
});

Then(/^SmartThings (Entryway Lights|Ceiling Fan|Office Fan) is (\w+) and (\w+) on SmartThings page$/, (dimmerName, state, value) => {
    switch (dimmerName) {
        case 'Entryway Lights':
            switch (state) {
                case 'on':
                    expect(SmartThingsPage.getTheaterTab().entrywayLightsOnButton.getProperty('checked')).toEqual(true);
                    break;
                case 'off':
                    expect(SmartThingsPage.getTheaterTab().entrywayLightsOffButton.getProperty('checked')).toEqual(true);
                    break;
            }
            break;
        case 'Ceiling Fan':
            if (state === 'off') {
                expect(SmartThingsPage.getTheaterTab().ceilingFanOffButton.getProperty('checked')).toEqual(true);
            } else {
                if (parseInt(value) <= 33) {
                    expect(SmartThingsPage.getTheaterTab().ceilingFanLowButton.getProperty('checked')).toEqual(true);
                }
                if (parseInt(value) > 33 && parseInt(value) <= 66) {
                    expect(SmartThingsPage.getTheaterTab().ceilingFanMediumButton.getProperty('checked')).toEqual(true);
                }
                if (parseInt(value) > 66) {
                    expect(SmartThingsPage.getTheaterTab().ceilingFanHighButton.getProperty('checked')).toEqual(true);
                }
            }
            break;
        case 'Office Fan':
            if (state === 'off') {
                expect(SmartThingsPage.getTheaterTab().officeFanOffButton.getProperty('checked')).toEqual(true);
            } else {
                if (parseInt(value) <= 33) {
                    expect(SmartThingsPage.getTheaterTab().officeFanLowButton.getProperty('checked')).toEqual(true);
                }
                if (parseInt(value) > 33 && parseInt(value) <= 66) {
                    expect(SmartThingsPage.getTheaterTab().officeFanMediumButton.getProperty('checked')).toEqual(true);
                }
                if (parseInt(value) > 66) {
                    expect(SmartThingsPage.getTheaterTab().officeFanHighButton.getProperty('checked')).toEqual(true);
                }
            }
            break;
        default:
            break;
    }
});

Then(/^SmartThings (Ceiling Fan Light|Office Dimmer|Office Light|Kitchen Light) dimmer value is (\w+) on Dashboard page$/, (dimmerName, value) => {
    switch (dimmerName) {
        case 'Ceiling Fan Light':
            expect(DashboardPage.theaterCeilingFanLightButton.getText()).toEqual(`${dimmerName}\n${value.toString()}%`);
            break;
        case 'Office Dimmer':
            break;
        case 'Office Light':
            break;
        case 'Kitchen Light':
            break;
        default:
            break;
    }
});
