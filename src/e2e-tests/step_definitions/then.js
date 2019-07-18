import {Then} from 'cucumber'
import AutelisPage from '../page-objects/autelis.page';
import DashboardPage from '../page-objects/dashboard.page'
import NestPage from '../page-objects/nest.page';
import SensorsPage from '../page-objects/sensors.page';
import SmartThingsPage from '../page-objects/smartthings/smartthings.page';
import TheaterPage from '../page-objects/theater.page';
import WeatherPage from '../page-objects/weather.page';
import expect from 'expect'

Then(
    /^User is redirected to (Autelis|Dashboard|Nest|Sensors|SmartThings|Theater|Weather) page$/,
    {},
    page => {
        switch (page) {
            case "Autelis":
                expect(browser.getUrl()).toContain(AutelisPage.path);
                break;
            case "Dashboard":
                expect(browser.getUrl()).toContain(DashboardPage.path);
                break;
            case "Nest":
                expect(browser.getUrl()).toContain(NestPage.path);
                break;
            case "Sensors":
                expect(browser.getUrl()).toContain(SensorsPage.path);
                break;
            case "SmartThings":
                expect(browser.getUrl()).toContain(SmartThingsPage.path);
                break;
            case "Theater":
                expect(browser.getUrl()).toContain(TheaterPage.path);
                break;
            case "Weather":
                expect(browser.getUrl()).toContain(WeatherPage.path);
                break;
        }
    }
);

Then(
    /^(Autelis|Dashboard|Nest|Sensors|SmartThings|Theater|Weather) tab shall be selected$/,
    {},
    menuButton => {
        switch (menuButton) {
            case "Autelis":
                AutelisPage.getMenu().isAutelisMenuSelected();
                break;
            case "Dashboard":
                DashboardPage.getMenu().isDashboardMenuSelected();
                break;
            case "Nest":
                NestPage.getMenu().isNestMenuSelected();
                break;
            case "Sensors":
                SensorsPage.getMenu().isSensorsMenuSelected();
                break;
            case "SmartThings":
                SmartThingsPage.getMenu().isSmartThingsMenuSelected();
                break;
            case "Theater":
                TheaterPage.getMenu().isTheaterMenuSelected();
                break;
            case "Weather":
                WeatherPage.getMenu().isWeatherMenuSelected();
                break;
        }
    }
);

Then(/^(Theater|Bedroom) tab is loaded$/, {}, tabButton => {
    switch (tabButton) {
        case "Bedroom":
            DashboardPage.isBedroomTabSelected();
            break;
        case "Theater":
            DashboardPage.isTheaterTabSelected();
            break;
    }
});

Then(/^(HomeTheater) tab is loaded$/, {}, tabName => {
    TheaterPage.isHomeTheaterTabSelected();
});

Then(/^(Los Angeles, CA|New York, NY) tab is loaded$/, {}, tabButton => {
    switch (tabButton) {
        case "Los Angeles, CA":
            WeatherPage.isLATabSelected();
            break;
        case "New York, NY":
            WeatherPage.isNYTabSelected();
            break;
    }
});

Then(/^(Hallway Thermostat|Entryway Nest Protect) tab is loaded$/, {}, tabName => {
    switch (tabName) {
        case "Entryway Nest Protect":
            NestPage.isEntrywayTabSelected();
            break;
        case "Hallway Thermostat":
            NestPage.isHallwayTabSelected();
            break;
    }
});

Then(
    /^(SPA-POOL parameters turned off|Pool parameters are displayed|Spa and Solar parameters are displayed) on Autelis page$/,
    parametersStatus => {
        switch (parametersStatus) {
            case "All Autelis SPA-POOL parameters should be turned off":
                AutelisPage.isPoolAndSpaParametersTurnedOff();
                break;
            case "Pool parameters are displayed":
                AutelisPage.isPoolParameterDisplayed();
                break;
            case "Spa and Solar parameters are displayed":
                AutelisPage.isSpaAndSolarParameterDisplayed();
                break;
        }
    }
);

Then(/^Autelis (Solar|Cleaner|Pool Heat|Pool Light|Waterfall|Spa Heat|Jets|Spa Light|Blower) button is (enabled|disabled)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Solar':
            state === 'enabled' ? AutelisPage.solarOnButton.isButtonEnabled() :
                AutelisPage.solarOffButton.isButtonEnabled();
            break;
        case 'Cleaner':
            state === 'enabled' ? AutelisPage.cleanerOnButton.isButtonEnabled() :
                AutelisPage.cleanerOffButton.isButtonEnabled();
            break;
        case 'Pool Heat':
            state === 'enabled' ? AutelisPage.poolHeatOnButton.isButtonEnabled() :
                AutelisPage.poolHeatOffButton.isButtonEnabled();
            break;
        case 'Pool Light':
            state === 'enabled' ? AutelisPage.poolLightOnButton.isButtonEnabled() :
                AutelisPage.poolLightOffButton.isButtonEnabled();
            break;
        case 'Waterfall':
            state === 'enabled' ? AutelisPage.waterfallOnButton.isButtonEnabled() :
                AutelisPage.waterfallOffButton.isButtonEnabled();
            break;
        case 'Spa Heat':
            state === 'enabled' ? AutelisPage.spaHeatOnButton.isButtonEnabled() :
                AutelisPage.spaHeatOffButton.isButtonEnabled();
            break;
        case 'Jets':
            state === 'enabled' ? AutelisPage.jetsOnButton.isButtonEnabled() :
                AutelisPage.jetsOffButton.isButtonEnabled();
            break;
        case 'Spa Light':
            state === 'enabled' ? AutelisPage.spaLightOnButton.isButtonEnabled() :
                AutelisPage.spaLightOffButton.isButtonEnabled();
            break;
        case 'Blower':
            state === 'enabled' ? AutelisPage.blowerOnButton.isButtonEnabled() :
                AutelisPage.blowerOffButton.isButtonEnabled();
            break;
    }
});

Then(/^SmartThings (Ceiling Fan Light|Ceiling Fan|Office Dimmer|Office Light|Office Fan|Entryway Lights|Kitchen Light|Bathroom Light|Bedroom Lamp|Bedroom Fan|Bedroom Light|Porch Light|Outside Light|Outdoor Lights) button is in (On|Off|Low|Medium|High) state$/, (buttonName, state) => {
        switch (buttonName) {
            case 'Ceiling Fan Light':
                switch (state) {
                    case 'On':
                        SmartThingsPage.getTheaterTab().ceilingFanLightOnSwitch.waitForButtonToBeDisplayed();
                        break;
                    case 'Off':
                        SmartThingsPage.getTheaterTab().ceilingFanLightOffSwitch.waitForButtonToBeDisplayed();
                        break;
                    default:
                        break;
                }
                break;
            case 'Ceiling Fan':
                switch (state) {
                    case 'Off':
                        SmartThingsPage.getTheaterTab().ceilingFanOffButton.isButtonEnabled();
                        break;
                    case 'Low':
                        SmartThingsPage.getTheaterTab().ceilingFanLowButton.isButtonEnabled();
                        break;
                    case 'Medium':
                        SmartThingsPage.getTheaterTab().ceilingFanMediumButton.isButtonEnabled();
                        break;
                    case 'High':
                        SmartThingsPage.getTheaterTab().ceilingFanHighButton.isButtonEnabled();
                        break;
                    default:
                        break;
                }
                break;
            case 'Office Dimmer':
                switch (state) {
                    case 'On':
                        SmartThingsPage.getTheaterTab().officeDimmerOnSwitch.waitForButtonToBeDisplayed();
                        break;
                    case 'Off':
                        SmartThingsPage.getTheaterTab().officeDimmerOffSwitch.waitForButtonToBeDisplayed();
                        break;
                    default:
                        break;
                }
                break;
            case 'Office Light':
                switch (state) {
                    case 'On':
                        SmartThingsPage.getTheaterTab().officeLightOnSwitch.waitForButtonToBeDisplayed();
                        break;
                    case 'Off':
                        SmartThingsPage.getTheaterTab().officeLightOffSwitch.waitForButtonToBeDisplayed();
                        break;
                    default:
                        break;
                }
                break;
            case 'Office Fan':
                switch (state) {
                    case 'Off':
                        SmartThingsPage.getTheaterTab().officeFanOffButton.isButtonEnabled();
                        break;
                    case 'Low':
                        SmartThingsPage.getTheaterTab().officeFanLowButton.isButtonEnabled();
                        break;
                    case 'Medium':
                        SmartThingsPage.getTheaterTab().officeFanMediumButton.isButtonEnabled();
                        break;
                    case 'High':
                        SmartThingsPage.getTheaterTab().officeFanHighButton.isButtonEnabled();
                        break;
                    default:
                        break;
                }
                break;
            case 'Entryway Lights':
                switch (state) {
                    case 'On':
                        SmartThingsPage.getTheaterTab().entrywayLightsOnButton.isButtonEnabled();
                        break;
                    case 'Off':
                        SmartThingsPage.getTheaterTab().entrywayLightsOffButton.isButtonEnabled();
                        break;
                    default:
                        break;
                }
                break;
            case 'Kitchen Light':
                switch (state) {
                    case 'On':
                        SmartThingsPage.getTheaterTab().kitchenLightOnSwitch.waitForButtonToBeDisplayed();
                        break;
                    case 'Off':
                        SmartThingsPage.getTheaterTab().kitchenLightOffSwitch.waitForButtonToBeDisplayed();
                        break;
                    default:
                        break;
                }
                break;
            case 'Bathroom Light':
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
        }
    }
);

Then(/^(Pool|Spa) heat is (increased|decreased) on Autelis page$/, (type, action) => {
    switch (type) {
        case "Pool":
            action === "increased"
                ? AutelisPage.checkPoolHeatIncreased()
                : AutelisPage.checkPoolHeatDecreased();
            break;
        case "Spa":
            action === "increased"
                ? AutelisPage.checkSpaHeatIncreased()
                : AutelisPage.checkSpaHeatDecreased();
            break;
    }
});
