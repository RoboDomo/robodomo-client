import expect from 'expect';
import { Then } from 'cucumber';
import SmartThingsPage from '../page_objects/smartthings.page';
import DashboardPage from '../page_objects/dashboard.page';

Then(/^SmartThings (Bathroom Light) button is in (On|Off|Low|Medium|High) state$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Bathroom Light':
            SmartThingsPage.getBathroomTab().validateBathroomLightState(state);
            break;
        default:
            break;
    }
});

Then(/^SmartThings (Bedroom Lamp|Bedroom Fan|Bedroom Light) button is in (On|Off|Low|Medium|High) state$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Bedroom Fan':
            SmartThingsPage.getBedroomTab().validateBedroomFanState(state);
            break;
        case 'Bedroom Light':
            SmartThingsPage.getBedroomTab().validateBedroomLightState(state);
            break;
        case 'Bedroom Lamp':
            SmartThingsPage.getBedroomTab().validateBedroomLampState(state);
            break;
        default:
            break;
    }
});

Then(/^SmartThings (Ceiling Fan Light|Ceiling Fan|Entryway Lights) button is in (On|Off|Low|Medium|High) state$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Ceiling Fan Light':
            SmartThingsPage.getTheaterTab().validateCeilingFanLightState(state);
            break;
        case 'Ceiling Fan':
            SmartThingsPage.getTheaterTab().validateCeilingFanState(state);
            break;
        case 'Entryway Lights':
            SmartThingsPage.getTheaterTab().validateEntrywayLightsState(state);
            break;
        default:
            break;
    }

});

Then(/^SmartThings (Kitchen Light) button is in (On|Off|Low|Medium|High) state$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Kitchen Light':
            SmartThingsPage.getKitchenTab().validateKitchenLightState(state);
            break;
        default:
            break;
    }
});

Then(/^SmartThings (Office Dimmer|Office Light|Office Fan) button is in (On|Off|Low|Medium|High) state$/, (buttonName, state) => {
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
        default:
            break;
    }
});

Then(/^SmartThings (Porch Light|Outside Light|Outdoor Lights) button is in (On|Off|Low|Medium|High) state$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Porch Light':
            SmartThingsPage.getOutsideTab().validatePorchLightState(state);
            break;
        case 'Outside Light':
            SmartThingsPage.getOutsideTab().validateOutsideLightState(state);
            break;
        case 'Outdoor Lights':
            SmartThingsPage.getOutsideTab().validateOutdoorLightsState(state);
            break;
        default:
            break;
    }
});

Then(/^SmartThings (Ceiling Fan Light) dimmer value is (\w+) on SmartThings page$/, (dimmerName, value) => {
    switch (dimmerName) {
        case 'Ceiling Fan Light':
            SmartThingsPage.getTheaterTab().validateCeilingFanLightDimmValue(value);
            break;
        default:
            break;
    }
});

Then(/^SmartThings (Office Dimmer|Office Light) dimmer value is (\w+) on SmartThings page$/, (dimmerName, value) => {
    switch (dimmerName) {
        case 'Office Dimmer':
            SmartThingsPage.getOfficeTab().validateOfficeDimmValue(value);
            break;
        case 'Office Light':
            SmartThingsPage.getOfficeTab().validateOfficeLightDimmValue(value);
            break;
        default:
            break;
    }
});

Then(/^SmartThings (Kitchen Light) dimmer value is (\w+) on SmartThings page$/, (dimmerName, value) => {
    switch (dimmerName) {
        case 'Kitchen Light':
            SmartThingsPage.getKitchenTab().validateKitchenLightDimmValue(value);
            break;
        default:
            break;
    }
});

Then(/^SmartThings (Bathroom Light) dimmer value is (\w+) on SmartThings page$/, (dimmerName, value) => {
    switch (dimmerName) {
        case 'Bathroom Light':
            SmartThingsPage.getBathroomTab().validateBathroomLightDimmValue(value);
            break;
        default:
            break;
    }
});

Then(/^SmartThings (Bedroom Light) dimmer value is (\w+) on SmartThings page$/, (dimmerName, value) => {
    switch (dimmerName) {
        case 'Bedroom Light':
            SmartThingsPage.getBedroomTab().validateBedroomLightDimmValue(value);
            break;
        default:
            break;
    }
});

// TODO this needs to be merged into the other ones that don't use MQTP data manipulation
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

// TODO Fix this when state is persisted
Then(/^SmartThings (Ceiling Fan Light|Office Dimmer|Office Light|Kitchen Light) dimmer value is (\w+) on Dashboard page$/, (dimmerName, value) => {
    switch (dimmerName) {
        case 'Ceiling Fan Light':
            DashboardPage.theaterCeilingFanLightDiv.waitForAnimation();
            expect(DashboardPage.theaterCeilingFanLightButton.getText()).toEqual(`${dimmerName}${value.toString()}%`);
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
