/* eslint max-len: ['error', { code: 120,  'ignoreComments': true, 'ignoreStrings': true, 'ignoreTrailingComments': true , 'ignoreRegExpLiterals': true }] */
/* eslint no-unused-expressions: ['error', { 'allowTernary': true}] */

import { Then } from 'cucumber';
import AutelisPage from '../page_objects/autelis.page';
import DashboardPage from '../page_objects/dashboard.page';
import NestPage from '../page_objects/nest.page';
import SensorsPage from '../page_objects/sensors.page';
import SmartThingsPage from '../page_objects/smartthings.page';
import TheaterPage from '../page_objects/theater.page';
import WeatherPage from '../page_objects/weather.page';

Then(/^User is redirected to (Autelis|Dashboard|Nest|Sensors|SmartThings|Theater|Weather) page$/, {}, (page) => {
    switch (page) {
        case 'Autelis':
            browser.waitUntil(() => browser.getUrl().includes(AutelisPage.path), 5000);
            break;
        case 'Dashboard':
            browser.waitUntil(() => browser.getUrl().includes(DashboardPage.path), 5000);
            break;
        case 'Nest':
            browser.waitUntil(() => browser.getUrl().includes(NestPage.path), 5000);
            break;
        case 'Sensors':
            browser.waitUntil(() => browser.getUrl().includes(SensorsPage.path), 5000);
            break;
        case 'SmartThings':
            browser.waitUntil(() => browser.getUrl().includes(SmartThingsPage.path), 5000);
            break;
        case 'Theater':
            browser.waitUntil(() => browser.getUrl().includes(TheaterPage.path), 5000);
            break;
        case 'Weather':
            browser.waitUntil(() => browser.getUrl().includes(WeatherPage.path), 5000);
            break;
        default:
            break;
    }
});

Then(/^(Autelis|Dashboard|Nest|Sensors|SmartThings|Theater|Weather) tab shall be selected$/, {}, (menuButton) => {
    switch (menuButton) {
        case 'Autelis':
            AutelisPage.getMenu().isAutelisMenuSelected();
            break;
        case 'Dashboard':
            DashboardPage.getMenu().isDashboardMenuSelected();
            break;
        case 'Nest':
            NestPage.getMenu().isNestMenuSelected();
            break;
        case 'Sensors':
            SensorsPage.getMenu().isSensorsMenuSelected();
            break;
        case 'SmartThings':
            SmartThingsPage.getMenu().isSmartThingsMenuSelected();
            break;
        case 'Theater':
            TheaterPage.getMenu().isTheaterMenuSelected();
            break;
        case 'Weather':
            WeatherPage.getMenu().isWeatherMenuSelected();
            break;
        default:
            break;
    }
});

Then(/^(Theater|Bedroom) tab is loaded$/, {}, (tabButton) => {
    switch (tabButton) {
        case 'Bedroom':
            DashboardPage.isBedroomTabSelected();
            break;
        case 'Theater':
            DashboardPage.isTheaterTabSelected();
            break;
        default:
            break;
    }
});

// eslint-disable-next-line no-unused-vars
Then(/^(HomeTheater) tab is loaded$/, {}, (tabName) => {
    TheaterPage.isHomeTheaterTabSelected();
});

Then(/^(Los Angeles, CA|New York, NY) tab is loaded$/, {}, (tabButton) => {
    switch (tabButton) {
        case 'Los Angeles, CA':
            WeatherPage.isLATabSelected();
            break;
        case 'New York, NY':
            WeatherPage.isNYTabSelected();
            break;
        default:
            break;
    }
});

Then(/^(Hallway Thermostat|Entryway Nest Protect) tab is loaded$/, {}, (tabName) => {
    switch (tabName) {
        case 'Entryway Nest Protect':
            NestPage.isEntrywayTabSelected();
            break;
        case 'Hallway Thermostat':
            NestPage.isHallwayTabSelected();
            break;
        default:
            break;
    }
});

Then(/^(SPA-POOL parameters turned off|Pool parameters are displayed|Spa and Solar parameters are displayed) on Autelis page$/, (parametersStatus) => {
    switch (parametersStatus) {
        case 'All Autelis SPA-POOL parameters should be turned off':
            AutelisPage.isPoolAndSpaParametersTurnedOff();
            break;
        case 'Pool parameters are displayed':
            AutelisPage.isPoolParameterDisplayed();
            break;
        case 'Spa and Solar parameters are displayed':
            AutelisPage.isSpaAndSolarParameterDisplayed();
            break;
        default:
            break;
    }
});

Then(/^Autelis (Solar|Cleaner|Pool Heat|Pool Light|Waterfall|Spa Heat|Jets|Spa Light|Blower) button is (enabled|disabled)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Solar':
            state === 'enabled'
                ? AutelisPage.isButtonEnabled(AutelisPage.solarOnButton)
                : AutelisPage.isButtonEnabled(AutelisPage.solarOffButton);
            break;
        case 'Cleaner':
            state === 'enabled'
                ? AutelisPage.isButtonEnabled(AutelisPage.cleanerOnButton)
                : AutelisPage.isButtonEnabled(AutelisPage.cleanerOffButton);
            break;
        case 'Pool Heat':
            state === 'enabled'
                ? AutelisPage.isButtonEnabled(AutelisPage.poolHeatOnButton)
                : AutelisPage.isButtonEnabled(AutelisPage.poolHeatOffButton);
            break;
        case 'Pool Light':
            state === 'enabled'
                ? AutelisPage.isButtonEnabled(AutelisPage.poolLightOnButton)
                : AutelisPage.isButtonEnabled(AutelisPage.poolLightOffButton);
            break;
        case 'Waterfall':
            state === 'enabled'
                ? AutelisPage.isButtonEnabled(AutelisPage.waterfallOnButton)
                : AutelisPage.isButtonEnabled(AutelisPage.waterfallOffButton);
            break;
        case 'Spa Heat':
            state === 'enabled'
                ? AutelisPage.isButtonEnabled(AutelisPage.spaHeatOnButton)
                : AutelisPage.isButtonEnabled(AutelisPage.spaHeatOffButton);
            break;
        case 'Jets':
            state === 'enabled'
                ? AutelisPage.isButtonEnabled(AutelisPage.jetsOnButton)
                : AutelisPage.isButtonEnabled(AutelisPage.jetsOffButton);
            break;
        case 'Spa Light':
            state === 'enabled'
                ? AutelisPage.isButtonEnabled(AutelisPage.spaLightOnButton)
                : AutelisPage.isButtonEnabled(AutelisPage.spaLightOffButton);
            break;
        case 'Blower':
            state === 'enabled'
                ? AutelisPage.isButtonEnabled(AutelisPage.blowerOnButton)
                : AutelisPage.isButtonEnabled(AutelisPage.blowerOffButton);
            break;
        default:
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
        default:
            break;
    }
});

Then(/^(Pool|Spa) heat is (increased|decreased) on Autelis page$/, (type, action) => {
    switch (type) {
        case 'Pool':
            action === 'increased'
                ? AutelisPage.checkPoolHeatIncreased()
                : AutelisPage.checkPoolHeatDecreased();
            break;
        case 'Spa':
            action === 'increased'
                ? AutelisPage.checkSpaHeatIncreased()
                : AutelisPage.checkSpaHeatDecreased();
            break;
        default:
            break;
    }
});
