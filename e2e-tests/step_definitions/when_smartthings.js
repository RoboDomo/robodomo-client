import { When } from 'cucumber';
import SmartThingsPage from '../page_objects/smartthings.page';

When(/^User clicks on (Theater|Office|Back Room|Bedroom|Kitchen|Bathroom|Outside) tab on SmartThings page$/, (tabName) => {
    switch (tabName) {
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

When(/^User changes SmartThings (Bathroom Light) button state to (On|Off|Low|Medium|High)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Bathroom Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.getBathroomTab().toggleBathroomLight(true);
                    break;
                case 'Off':
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

When(/^User changes SmartThings (Bedroom Lamp|Bedroom Fan|Bedroom Light) button state to (On|Off|Low|Medium|High)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Bedroom Lamp':
            switch (state) {
                case 'On':
                    SmartThingsPage.getBedroomTab().toggleBedroomLamp(true);
                    break;
                case 'Off':
                    SmartThingsPage.getBedroomTab().toggleBedroomLamp(false);
                    break;
                default:
                    break;
            }
            break;
        case 'Bedroom Fan':
            switch (state) {
                case 'Off':
                    SmartThingsPage.getBedroomTab().clickBedroomFanOffButton();
                    break;
                case 'Low':
                    SmartThingsPage.getBedroomTab().clickBedroomFanLowButton();
                    break;
                case 'Medium':
                    SmartThingsPage.getBedroomTab().clickBedroomFanMediumButton();
                    break;
                case 'High':
                    SmartThingsPage.getBedroomTab().clickBedroomFanHighButton();
                    break;
                default:
                    break;
            }
            break;
        case 'Bedroom Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.getBedroomTab().toggleBedroomLight(true);
                    break;
                case 'Off':
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

When(/^User changes SmartThings (Ceiling Fan Light|Ceiling Fan|Entryway Lights) button state to (On|Off|Low|Medium|High)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Ceiling Fan Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.getTheaterTab().toggleCeilingFanLight(true);
                    break;
                case 'Off':
                    SmartThingsPage.getTheaterTab().toggleCeilingFanLight(false);
                    break;
                default:
                    break;
            }
            break;
        case 'Ceiling Fan':
            switch (state) {
                case 'Off':
                    SmartThingsPage.getTheaterTab().clickCeilingFanOffButton();
                    break;
                case 'Low':
                    SmartThingsPage.getTheaterTab().clickCeilingFanLowButton();
                    break;
                case 'Medium':
                    SmartThingsPage.getTheaterTab().clickCeilingFanMediumButton();
                    break;
                case 'High':
                    SmartThingsPage.getTheaterTab().clickCeilingFanHighButton();
                    break;
                default:
                    break;
            }
            break;
        case 'Entryway Lights':
            switch (state) {
                case 'On':
                    SmartThingsPage.getTheaterTab().toggleEntrywayLights(true);
                    break;
                case 'Off':
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

When(/^User changes SmartThings (Kitchen Light) button state to (On|Off|Low|Medium|High)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Kitchen Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.getKitchenTab().toggleKitchenLight(true);
                    break;
                case 'Off':
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

When(/^User changes SmartThings (Office Dimmer|Office Light|Office Fan) button state to (On|Off|Low|Medium|High)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Office Dimmer':
            switch (state) {
                case 'On':
                    SmartThingsPage.getOfficeTab().toggleOfficeDimmer(true);
                    break;
                case 'Off':
                    SmartThingsPage.getOfficeTab().toggleOfficeDimmer(false);
                    break;
                default:
                    break;
            }
            break;
        case 'Office Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.getOfficeTab().toggleOfficeLight(true);
                    break;
                case 'Off':
                    SmartThingsPage.getOfficeTab().toggleOfficeLight(false);
                    break;
                default:
                    break;
            }
            break;
        case 'Office Fan':
            switch (state) {
                case 'Off':
                    SmartThingsPage.getOfficeTab().clickOfficeFanOffButton();
                    break;
                case 'Low':
                    SmartThingsPage.getOfficeTab().clickOfficeFanLowButton();
                    break;
                case 'Medium':
                    SmartThingsPage.getOfficeTab().clickOfficeFanMediumButton();
                    break;
                case 'High':
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

When(/^User changes SmartThings (Porch Light|Outside Light|Outdoor Lights) button state to (On|Off)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Porch Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.getOutsideTab().togglePorchLight(true);
                    break;
                case 'Off':
                    SmartThingsPage.getOutsideTab().togglePorchLight(false);
                    break;
                default:
                    break;
            }
            break;
        case 'Outside Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.getOutsideTab().toggleOutsideLight(true);
                    break;
                case 'Off':
                    SmartThingsPage.getOutsideTab().toggleOutsideLight(false);
                    break;
                default:
                    break;
            }
            break;
        case 'Outdoor Lights':
            switch (state) {
                case 'On':
                    SmartThingsPage.getOutsideTab().toggleOutdoorLights(true);
                    break;
                case 'Off':
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
