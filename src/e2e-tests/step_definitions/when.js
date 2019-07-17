import {When} from 'cucumber';
import AutelisPage from '../page-objects/autelis.page';
import DashboardPage from '../page-objects/dashboard.page';
import NestPage from '../page-objects/nest.page';
import Page from '../page-objects/page'
import SensorsPage from '../page-objects/sensors.page';
import SmartThingsMenuPage from '../page-objects/smartthings/smartthings.component';
import TheaterPage from '../page-objects/theater.page';
import WeatherPage from '../page-objects/weather.page';

When(/^User clicks (Autelis|Dashboard|Nest|Sensors|SmartThings|Theater|Weather) menu button$/, {wrapperOptions: {retry: 2}}, (menuButton) => {
    switch (menuButton) {
        case 'Autelis':
            new Page('', '/').getMenu().goToAutelisPage();
            break;
        case 'Dashboard':
            new Page('', '/').getMenu().goToDashboardPage();
            break;
        case 'Nest':
            new Page('', '/').getMenu().goToNestPage();
            break;
        case 'Sensors':
            new Page('', '/').getMenu().goToSensorsPage();
            break;
        case 'SmartThings':
            new Page('', '/').getMenu().goToSmartThingsPage();
            break;
        case 'Theater':
            new Page('', '/').getMenu().goToTheaterPage();
            break;
        case 'Weather':
            new Page('', '/').getMenu().goToWeatherPage();
            break;
    }
});

When(/^User clicks on (Bedroom|Theater) tab$/, {wrapperOptions: {retry: 2}}, (menuButton) => {
    switch (menuButton) {
        case 'Bedroom':
            DashboardPage.goToBedroomTab();
            break;
        case 'Theater':
            DashboardPage.goToTheaterTab();
            break;
    }
});

When(/^User clicks on (HomeTheater|Autelis) tab$/, {wrapperOptions: {retry: 2}}, (tabName) => {
    switch (tabName) {
        case 'HomeTheater':
            TheaterPage.goToHomeTheaterTab();
            break;
        case 'Autelis':
            AutelisPage.goToAutelisTab();
            break;
    }
});

When(/^User clicks on (New York, NY|Los Angeles, CA) tab$/, {wrapperOptions: {retry: 2}}, (menuButton) => {
    switch (menuButton) {
        case 'New York, NY':
            WeatherPage.goToNYTab();
            break;
        case 'Los Angeles, CA':
            WeatherPage.goToLATab();
            break;
    }
});

When(/^User clicks on (Hallway Thermostat|Entryway Nest Protect) tab$/, {wrapperOptions: {retry: 2}}, (tabName) => {
    switch (tabName) {
        case 'Entryway Nest Protect':
            NestPage.goToEntrywayTab();
            break;
        case 'Hallway Thermostat':
            NestPage.goToHallwayTab();
            break;
    }
});

When(/^User clicks on (Theater|Office|Back Room|Bedroom|Kitchen|Bathroom|Outside) tab on SmartThings page$/, (tabName) => {
    switch (tabName) {
        case 'Theater':
            SmartThingsMenuPage.goToTheaterTab();
            break;
        case 'Office':
            SmartThingsMenuPage.goToOfficeTab();
            break;
        case 'Back Room':
            SmartThingsMenuPage.goToBackRoomTab();
            break;
        case 'Bedroom':
            SmartThingsMenuPage.goToBedroomTab();
            break;
        case 'Kitchen':
            SmartThingsMenuPage.goToKitchenTab();
            break;
        case 'Bathroom':
            SmartThingsMenuPage.goToBathroomTab();
            break;
        case 'Outside':
            SmartThingsMenuPage.goToOutsideTab();
            break;
    }
});

When(/^User clicks on (OFF|POOL|SPA) button on Autelis page$/, (buttonName) => {
    switch (buttonName) {
        case 'OFF':
            AutelisPage.clickOffButton();
            break;
        case 'POOL':
            AutelisPage.clickPoolButton();
            break;
        case 'SPA':
            AutelisPage.clickSpaButton();
            break;
    }
});

When(/^User clicks on (Solar|Cleaner|Pool Heat|Pool Light|Waterfall|Spa Heat|Jets|Spa Light|Blower) button to change state to (On|Off) on Autelis page$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Solar':
            state === 'On' ? AutelisPage.clickSolarOnButton() : AutelisPage.clickSolarOffButton();
            break;
        case 'Cleaner':
            state === 'On' ? AutelisPage.clickCleanerOnButton() : AutelisPage.clickCleanerOffButton();
            break;
        case 'Pool Heat':
            state === 'On' ? AutelisPage.clickPoolHeatOnButton() : AutelisPage.clickPoolHeatOffButton();
            break;
        case 'Pool Light':
            state === 'On' ? AutelisPage.clickPoolLightOnButton() : AutelisPage.clickPoolLightOffButton();
            break;
        case 'Waterfall':
            state === 'On' ? AutelisPage.clickWaterfallOnButton() : AutelisPage.clickWaterfallOffButton();
            break;
        case 'Spa Heat':
            state === 'On' ? AutelisPage.clickSpaHeatOnButton() : AutelisPage.clickSpaHeatOffButton();
            break;
        case 'Jets':
            state === 'On' ? AutelisPage.clickJetsOnButton() : AutelisPage.clickJetsOffButton();
            break;
        case 'Spa Light':
            state === 'On' ? AutelisPage.clickSpaLightOnButton() : AutelisPage.clickSpaLightOffButton();
            break;
        case 'Blower':
            state === 'On' ? AutelisPage.clickBlowerOnButton() : AutelisPage.clickBlowerOffButton();
            break;
    }
});

When(/^User clicks on (Ceiling Fan Light|Ceiling Fan|Office Dimmer|Office Light|Office Fan|Entryway Lights|Kitchen Light|Bathroom Light|Bedroom Lamp|Bedroom Fan|Bedroom Light|Porch Light|Outside Light|Outdoor Lights) button to change state to (On|Off|Low|Medium|High) at SmartThings page$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Ceiling Fan Light':
            switch (state) {
                case 'On':
                    SmartThingsMenuPage.getTheaterTab().clickCeilingFanLightOnSwitch();
                    break;
                case 'Off':
                    SmartThingsMenuPage.getTheaterTab().clickCeilingFanLightOffSwitch();
                    break;
                default:
                    break;
            }
            break;
        case 'Ceiling Fan':
            switch (state) {
                case 'Off':
                    SmartThingsMenuPage.getTheaterTab().clickCeilingFanOffButton();
                    break;
                case 'Low':
                    SmartThingsMenuPage.getTheaterTab().clickCeilingFanLowButton();
                    break;
                case 'Medium':
                    SmartThingsMenuPage.getTheaterTab().clickCeilingFanMediumButton();
                    break;
                case 'High':
                    SmartThingsMenuPage.getTheaterTab().clickCeilingFanHighButton();
                    break;
                default:
                    break;
            }
            break;
        case 'Office Dimmer':
            switch (state) {
                case 'On':
                    SmartThingsMenuPage.getTheaterTab().clickOfficeDimmerOnSwitch();
                    break;
                case 'Off':
                    SmartThingsMenuPage.getTheaterTab().clickOfficeDimmerOffSwitch();
                    break;
                default:
                    break;
            }
            break;
        case 'Office Light':
            switch (state) {
                case 'On':
                    SmartThingsMenuPage.getTheaterTab().clickOfficeLightOnSwitch();
                    break;
                case 'Off':
                    SmartThingsMenuPage.getTheaterTab().clickOfficeLightOffSwitch();
                    break;
                default:
                    break;
            }
            break;
        case 'Office Fan':
            switch (state) {
                case 'Off':
                    SmartThingsMenuPage.getTheaterTab().clickOfficeFanOffButton();
                    break;
                case 'Low':
                    SmartThingsMenuPage.getTheaterTab().clickOfficeFanLowButton();
                    break;
                case 'Medium':
                    SmartThingsMenuPage.getTheaterTab().clickOfficeFanMediumButton();
                    break;
                case 'High':
                    SmartThingsMenuPage.getTheaterTab().clickOfficeFanHighButton();
                    break;
                default:
                    break;
            }
            break;
        case 'Entryway Lights':
            switch (state) {
                case 'On':
                    SmartThingsMenuPage.getTheaterTab().clickEntrywayLightsOnButton();
                    break;
                case 'Off':
                    SmartThingsMenuPage.getTheaterTab().clickEntrywayLightsOffButton();
                    break;
                default:
                    break;
            }
            break;
        case 'Kitchen Light':
            switch (state) {
                case 'On':
                    SmartThingsMenuPage.getTheaterTab().clickKitchenLightOnSwitch();
                    break;
                case 'Off':
                    SmartThingsMenuPage.getTheaterTab().clickKitchenLightOffSwitch();
                    break;
                default:
                    break;
            }
            break;
        case 'Bathroom Light':
            switch (state) {
                case 'On':
                    SmartThingsMenuPage.getBedroomTabPage().clickBathroomLightOnSwitch();
                    break;
                case 'Off':
                    SmartThingsMenuPage.getBedroomTabPage().clickBathroomLightOffSwitch();
                    break;
                default:
                    break;
            }
            break;
        case 'Bedroom Lamp':
            switch (state) {
                case 'On':
                    SmartThingsMenuPage.getBedroomTabPage().clickBedroomLampOnButton();
                    break;
                case 'Off':
                    SmartThingsMenuPage.getBedroomTabPage().clickBedroomLampOffButton();
                    break;
                default:
                    break;
            }
            break;
        case 'Bedroom Fan':
            switch (state) {
                case 'Off':
                    SmartThingsMenuPage.getBedroomTabPage().clickBedroomFanOffButton();
                    break;
                case 'Low':
                    SmartThingsMenuPage.getBedroomTabPage().clickBedroomFanLowButton();
                    break;
                case 'Medium':
                    SmartThingsMenuPage.getBedroomTabPage().clickBedroomFanMediumButton();
                    break;
                case 'High':
                    SmartThingsMenuPage.getBedroomTabPage().clickBedroomFanHighButton();
                    break;
                default:
                    break;
            }
            break;
        case 'Bedroom Light':
            switch (state) {
                case 'On':
                    SmartThingsMenuPage.getBedroomTabPage().clickBedroomLightOnSwitch();
                    break;
                case 'Off':
                    SmartThingsMenuPage.getBedroomTabPage().clickBedroomLightOffSwitch();
                    break;
                default:
                    break;
            }
            break;
        case 'Porch Light':
            switch (state) {
                case 'On':
                    SmartThingsMenuPage.getOutsideTabPage().clickPorchLightOnButton();
                    break;
                case 'Off':
                    SmartThingsMenuPage.getOutsideTabPage().clickPorchLightOffButton();
                    break;
                default:
                    break;
            }
            break;
        case 'Outside Light':
            switch (state) {
                case 'On':
                    SmartThingsMenuPage.getOutsideTabPage().clickOutsideLightOnButton();
                    break;
                case 'Off':
                    SmartThingsMenuPage.getOutsideTabPage().clickOutsideLightOffButton();
                    break;
                default:
                    break;
            }
            break;
        case 'Outdoor Lights':
            switch (state) {
                case 'On':
                    SmartThingsMenuPage.getOutsideTabPage().clickOutdoorLightsOnButton();
                    break;
                case 'Off':
                    SmartThingsMenuPage.getOutsideTabPage().clickOutdoorLightsOffButton();
                    break;
                default:
                    break;
            }
            break;
    }
});

When(/^User (decreases|increases) (Pool|Spa) heat on Autelis page$/, (action, type) => {
    switch (type) {
        case 'Pool':
            action === 'increases' ? AutelisPage.clickIncreasePoolHeat() : AutelisPage.clickDecreasePoolHeat();
            break;
        case 'Spa':
            action === 'increases' ? AutelisPage.clickIncreaseSpaHeat() : AutelisPage.clickDecreaseSpaHeat();
            break;
    }
});
