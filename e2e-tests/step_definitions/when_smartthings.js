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

When(/^User changes SmartThings (Ceiling Fan Light|Ceiling Fan|Entryway Lights|Kitchen Light|Office Dimmer|Office Light|Office Fan) button state to (On|Off|Low|Medium|High)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Ceiling Fan Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.getTheaterTab().toggleCeilingFanLightSwitch(true);
                    break;
                case 'Off':
                    SmartThingsPage.getTheaterTab().toggleCeilingFanLightSwitch(false);
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
                    SmartThingsPage.getTheaterTab().toggleEntrywayLightsSwitch(true);
                    break;
                case 'Off':
                    SmartThingsPage.getTheaterTab().toggleEntrywayLightsSwitch(false);
                    break;
                default:
                    break;
            }
            break;
        case 'Kitchen Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.getTheaterTab().toggleKitchenLightSwitch(true);
                    break;
                case 'Off':
                    SmartThingsPage.getTheaterTab().toggleKitchenLightSwitch(false);
                    break;
                default:
                    break;
            }
            break;
        case 'Office Dimmer':
            switch (state) {
                case 'On':
                    SmartThingsPage.getTheaterTab().toggleOfficeDimmerSwitch(true);
                    break;
                case 'Off':
                    SmartThingsPage.getTheaterTab().toggleOfficeDimmerSwitch(false);
                    break;
                default:
                    break;
            }
            break;
        case 'Office Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.getTheaterTab().toggleOfficeLightSwitch(true);
                    break;
                case 'Off':
                    SmartThingsPage.getTheaterTab().toggleOfficeLightSwitch(false);
                    break;
                default:
                    break;
            }
            break;
        case 'Office Fan':
            switch (state) {
                case 'Off':
                    SmartThingsPage.getTheaterTab().clickOfficeFanOffButton();
                    break;
                case 'Low':
                    SmartThingsPage.getTheaterTab().clickOfficeFanLowButton();
                    break;
                case 'Medium':
                    SmartThingsPage.getTheaterTab().clickOfficeFanMediumButton();
                    break;
                case 'High':
                    SmartThingsPage.getTheaterTab().clickOfficeFanHighButton();
                    break;
                default:
                    break;
            }
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
                    SmartThingsPage.getBedroomTabPage().clickBathroomLightOnSwitch();
                    break;
                case 'Off':
                    SmartThingsPage.getBedroomTabPage().clickBathroomLightOffSwitch();
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
});

When(/^User changes SmartThings (Entryway Lights|Bedroom Lamp|Bedroom Fan|Bedroom Light) button state to (On|Off|Low|Medium|High)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Entryway Lights':
            switch (state) {
                case 'On':
                    SmartThingsPage.getBedroomTabPage().toggleEntrywayLightsSwitch(true);
                    break;
                case 'Off':
                    SmartThingsPage.getBedroomTabPage().toggleEntrywayLightsSwitch(false);
                    break;
                default:
                    break;
            }
            break;
        case 'Bedroom Lamp':
            switch (state) {
                case 'On':
                    SmartThingsPage.getBedroomTabPage().clickBedroomLampOnButton();
                    break;
                case 'Off':
                    SmartThingsPage.getBedroomTabPage().clickBedroomLampOffButton();
                    break;
                default:
                    break;
            }
            break;
        case 'Bedroom Fan':
            switch (state) {
                case 'Off':
                    SmartThingsPage.getBedroomTabPage().clickBedroomFanOffButton();
                    break;
                case 'Low':
                    SmartThingsPage.getBedroomTabPage().clickBedroomFanLowButton();
                    break;
                case 'Medium':
                    SmartThingsPage.getBedroomTabPage().clickBedroomFanMediumButton();
                    break;
                case 'High':
                    SmartThingsPage.getBedroomTabPage().clickBedroomFanHighButton();
                    break;
                default:
                    break;
            }
            break;
        case 'Bedroom Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.getBedroomTabPage().clickBedroomLightOnSwitch();
                    break;
                case 'Off':
                    SmartThingsPage.getBedroomTabPage().clickBedroomLightOffSwitch();
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
});

When(/^User changes SmartThings (Porch Light|Outside Light|Outdoor Lights) button state to (On|Off|Low|Medium|High)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Porch Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.getOutsideTabPage().clickPorchLightOnButton();
                    break;
                case 'Off':
                    SmartThingsPage.getOutsideTabPage().clickPorchLightOffButton();
                    break;
                default:
                    break;
            }
            break;
        case 'Outside Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.getOutsideTabPage().clickOutsideLightOnButton();
                    break;
                case 'Off':
                    SmartThingsPage.getOutsideTabPage().clickOutsideLightOffButton();
                    break;
                default:
                    break;
            }
            break;
        case 'Outdoor Lights':
            switch (state) {
                case 'On':
                    SmartThingsPage.getOutsideTabPage().clickOutdoorLightsOnButton();
                    break;
                case 'Off':
                    SmartThingsPage.getOutsideTabPage().clickOutdoorLightsOffButton();
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
});
