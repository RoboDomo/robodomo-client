import { When } from 'cucumber';
import SmartThingsPage from '../page_objects/smartthings.page';

When(/^User clicks on (All|Theater|Office|Back Room|Bedroom|Kitchen|Bathroom|Outside) tab on SmartThings page$/, (tabName) => {
    switch (tabName) {
        case 'All':
            SmartThingsPage.gotoAllTab();
            break;
        case 'Theater':
            SmartThingsPage.goToTheaterTab();
            break;
        case 'Office':
            SmartThingsPage.goToOfficeTab();
            break;
        case 'Back Room':
            SmartThingsPage.goToBackRoomTab();
            break;
        case 'Bedroom':
            SmartThingsPage.goToBedroomTab();
            break;
        case 'Kitchen':
            SmartThingsPage.goToKitchenTab();
            break;
        case 'Bathroom':
            SmartThingsPage.goToBathroomTab();
            break;
        case 'Outside':
            SmartThingsPage.goToOutsideTab();
            break;
        default:
            break;
    }
});

When(/^User changes SmartThings (Bathroom Light) button state to (on|off|low|medium|high)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Bathroom Light':
            switch (state) {
                case 'on':
                    SmartThingsPage.getBathroomTab().toggleBathroomLight(true);
                    break;
                case 'off':
                    SmartThingsPage.getBathroomTab().toggleBathroomLight(false);
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
});

When(/^User changes SmartThings (Bedroom Lamp|Bedroom Fan|Bedroom Light) button state to (on|off|low|medium|high)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Bedroom Lamp':
            switch (state) {
                case 'on':
                    SmartThingsPage.getBedroomTab().toggleBedroomLamp(true);
                    break;
                case 'off':
                    SmartThingsPage.getBedroomTab().toggleBedroomLamp(false);
                    break;
                default:
                    break;
            }
            break;
        case 'Bedroom Fan':
            switch (state) {
                case 'off':
                    SmartThingsPage.getBedroomTab().clickBedroomFanOffButton();
                    break;
                case 'low':
                    SmartThingsPage.getBedroomTab().clickBedroomFanLowButton();
                    break;
                case 'medium':
                    SmartThingsPage.getBedroomTab().clickBedroomFanMediumButton();
                    break;
                case 'high':
                    SmartThingsPage.getBedroomTab().clickBedroomFanHighButton();
                    break;
                default:
                    break;
            }
            break;
        case 'Bedroom Light':
            switch (state) {
                case 'on':
                    SmartThingsPage.getBedroomTab().toggleBedroomLight(true);
                    break;
                case 'off':
                    SmartThingsPage.getBedroomTab().toggleBedroomLight(false);
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
});

When(/^User changes SmartThings (Ceiling Fan Light|Ceiling Fan|Entryway Lights) button state to (on|off|low|medium|high)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Ceiling Fan Light':
            switch (state) {
                case 'on':
                    SmartThingsPage.getTheaterTab().toggleCeilingFanLight(true);
                    break;
                case 'off':
                    SmartThingsPage.getTheaterTab().toggleCeilingFanLight(false);
                    break;
                default:
                    break;
            }
            break;
        case 'Ceiling Fan':
            switch (state) {
                case 'off':
                    SmartThingsPage.getTheaterTab().clickCeilingFanOffButton();
                    break;
                case 'low':
                    SmartThingsPage.getTheaterTab().clickCeilingFanLowButton();
                    break;
                case 'medium':
                    SmartThingsPage.getTheaterTab().clickCeilingFanMediumButton();
                    break;
                case 'high':
                    SmartThingsPage.getTheaterTab().clickCeilingFanHighButton();
                    break;
                default:
                    break;
            }
            break;
        case 'Entryway Lights':
            switch (state) {
                case 'on':
                    SmartThingsPage.getTheaterTab().toggleEntrywayLights(true);
                    break;
                case 'off':
                    SmartThingsPage.getTheaterTab().toggleEntrywayLights(false);
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
});

When(/^User changes SmartThings (Kitchen Light) button state to (on|off|low|medium|high)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Kitchen Light':
            switch (state) {
                case 'on':
                    SmartThingsPage.getKitchenTab().toggleKitchenLight(true);
                    break;
                case 'off':
                    SmartThingsPage.getKitchenTab().toggleKitchenLight(false);
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
});

When(/^User changes SmartThings (Office Dimmer|Office Light|Office Fan) button state to (on|off|low|medium|high)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Office Dimmer':
            switch (state) {
                case 'on':
                    SmartThingsPage.getOfficeTab().toggleOfficeDimmer(true);
                    break;
                case 'off':
                    SmartThingsPage.getOfficeTab().toggleOfficeDimmer(false);
                    break;
                default:
                    break;
            }
            break;
        case 'Office Light':
            switch (state) {
                case 'on':
                    SmartThingsPage.getOfficeTab().toggleOfficeLight(true);
                    break;
                case 'off':
                    SmartThingsPage.getOfficeTab().toggleOfficeLight(false);
                    break;
                default:
                    break;
            }
            break;
        case 'Office Fan':
            switch (state) {
                case 'off':
                    SmartThingsPage.getOfficeTab().clickOfficeFanOffButton();
                    break;
                case 'low':
                    SmartThingsPage.getOfficeTab().clickOfficeFanLowButton();
                    break;
                case 'medium':
                    SmartThingsPage.getOfficeTab().clickOfficeFanMediumButton();
                    break;
                case 'high':
                    SmartThingsPage.getOfficeTab().clickOfficeFanHighButton();
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
});

When(/^User changes SmartThings (Porch Light|Outside Light|Outdoor Lights) button state to (on|off)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Porch Light':
            switch (state) {
                case 'on':
                    SmartThingsPage.getOutsideTab().togglePorchLight(true);
                    break;
                case 'off':
                    SmartThingsPage.getOutsideTab().togglePorchLight(false);
                    break;
                default:
                    break;
            }
            break;
        case 'Outside Light':
            switch (state) {
                case 'on':
                    SmartThingsPage.getOutsideTab().toggleOutsideLight(true);
                    break;
                case 'off':
                    SmartThingsPage.getOutsideTab().toggleOutsideLight(false);
                    break;
                default:
                    break;
            }
            break;
        case 'Outdoor Lights':
            switch (state) {
                case 'on':
                    SmartThingsPage.getOutsideTab().toggleOutdoorLights(true);
                    break;
                case 'off':
                    SmartThingsPage.getOutsideTab().toggleOutdoorLights(false);
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
});
