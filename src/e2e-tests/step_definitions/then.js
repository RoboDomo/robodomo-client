import {Then} from 'cucumber'
import AutelisPage from '../page-objects/autelis.page';
import DashboardPage from '../page-objects/dashboard.page'
import NestPage from '../page-objects/nest.page';
import SensorsPage from '../page-objects/sensors.page';
import SmartThingsPage from '../page-objects/smartthings.page';
import TheaterPage from '../page-objects/theater.page';
import WeatherPage from '../page-objects/weather.page';
import expect from 'expect'


Then(/^User is redirected to (Autelis|Dashboard|Nest|Sensors|SmartThings|Theater|Weather) page$/, {}, (page) => {
    switch (page) {
        case 'Autelis':
            expect(browser.getUrl()).toContain(AutelisPage.path);
            break;
        case 'Dashboard':
            expect(browser.getUrl()).toContain(DashboardPage.path);
            break;
        case 'Nest':
            expect(browser.getUrl()).toContain(NestPage.path);
            break;
        case 'Sensors':
            expect(browser.getUrl()).toContain(SensorsPage.path);
            break;
        case 'SmartThings':
            expect(browser.getUrl()).toContain(SmartThingsPage.path);
            break;
        case 'Theater':
            expect(browser.getUrl()).toContain(TheaterPage.path);
            break;
        case 'Weather':
            expect(browser.getUrl()).toContain(WeatherPage.path);
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
    }
});

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
    }
});

Then(/^Autelis (Solar|Cleaner|Pool Heat|Pool Light|Waterfall|Spa Heat|Jets|Spa Light|Blower) button is (enabled|disabled)$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Solar':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.solarOnButton) :
                AutelisPage.isButtonEnabled(AutelisPage.solarOffButton);
            break;
        case 'Cleaner':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.cleanerOnButton) :
                AutelisPage.isButtonEnabled(AutelisPage.cleanerOffButton);
            break;
        case 'Pool Heat':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.poolHeatOnButton) :
                AutelisPage.isButtonEnabled(AutelisPage.poolHeatOffButton);
            break;
        case 'Pool Light':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.poolLightOnButton) :
                AutelisPage.isButtonEnabled(AutelisPage.poolLightOffButton);
            break;
        case 'Waterfall':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.waterfallOnButton) :
                AutelisPage.isButtonEnabled(AutelisPage.waterfallOffButton);
            break;
        case 'Spa Heat':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.spaHeatOnButton) :
                AutelisPage.isButtonEnabled(AutelisPage.spaHeatOffButton);
            break;
        case 'Jets':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.jetsOnButton) :
                AutelisPage.isButtonEnabled(AutelisPage.jetsOffButton);
            break;
        case 'Spa Light':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.spaLightOnButton) :
                AutelisPage.isButtonEnabled(AutelisPage.spaLightOffButton);
            break;
        case 'Blower':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.blowerOnButton) :
                AutelisPage.isButtonEnabled(AutelisPage.blowerOffButton);
            break;
    }
});

Then(/^SmartThings (Ceiling Fan Light|Ceiling Fan|Office Dimmer|Office Light|Office Fan|Entryway Lights|Kitchen Light|Bathroom Light|Bedroom Lamp|Bedroom Fan|Bedroom Light|Porch Light|Outside Light|Outdoor Lights) button is in (On|Off|Low|Medium|High) state$/, (buttonName, state) => {
    switch (buttonName) {
        case 'Ceiling Fan Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.waitForButtonToBeDisplayed(SmartThingsPage.ceilingFanLightOnSwitch);
                    break;
                case 'Off':
                    SmartThingsPage.waitForButtonToBeDisplayed(SmartThingsPage.ceilingFanLightOffSwitch);
                    break;
                default:
                    break;
            }
            break;
        case 'Ceiling Fan':
            switch (state) {
                case 'Off':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.ceilingFanOffButton);
                    break;
                case 'Low':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.ceilingFanLowButton);
                    break;
                case 'Medium':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.ceilingFanMediumButton);
                    break;
                case 'High':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.ceilingFanHighButton);
                    break;
                default:
                    break;
            }
            break;
        case 'Office Dimmer':
            switch (state) {
                case 'On':
                    SmartThingsPage.waitForButtonToBeDisplayed(SmartThingsPage.officeDimmerOnSwitch);
                    break;
                case 'Off':
                    SmartThingsPage.waitForButtonToBeDisplayed(SmartThingsPage.officeDimmerOffSwitch);
                    break;
                default:
                    break;
            }
            break;
        case 'Office Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.waitForButtonToBeDisplayed(SmartThingsPage.officeLightOnSwitch);
                    break;
                case 'Off':
                    SmartThingsPage.waitForButtonToBeDisplayed(SmartThingsPage.officeLightOffSwitch);
                    break;
                default:
                    break;
            }
            break;
        case 'Office Fan':
            switch (state) {
                case 'Off':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.officeFanOffButton);
                    break;
                case 'Low':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.officeFanLowButton);
                    break;
                case 'Medium':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.officeFanMediumButton);
                    break;
                case 'High':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.officeFanHighButton);
                    break;
                default:
                    break;
            }
            break;
        case 'Entryway Lights':
            switch (state) {
                case 'On':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.entrywayLightsOnButton);
                    break;
                case 'Off':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.entrywayLightsOffButton);
                    break;
                default:
                    break;
            }
            break;
        case 'Kitchen Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.waitForButtonToBeDisplayed(SmartThingsPage.kitchenLightOnSwitch);
                    break;
                case 'Off':
                    SmartThingsPage.waitForButtonToBeDisplayed(SmartThingsPage.kitchenLightOffSwitch);
                    break;
                default:
                    break;
            }
            break;
        case 'Bathroom Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.waitForButtonToBeDisplayed(SmartThingsPage.bathroomLightOnSwitch);
                    break;
                case 'Off':
                    SmartThingsPage.waitForButtonToBeDisplayed(SmartThingsPage.bathroomLightOffSwitch);
                    break;
                default:
                    break;
            }
            break;
        case 'Bedroom Fan':
            switch (state) {
                case 'Off':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.bedroomFanOffButton);
                    break;
                case 'Low':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.bedroomFanLowButton);
                    break;
                case 'Medium':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.bedroomFanMediumButton);
                    break;
                case 'High':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.bedroomFanHighButton);
                    break;
                default:
                    break;
            }
            break;
        case 'Bedroom Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.waitForButtonToBeDisplayed(SmartThingsPage.bedroomLightOnSwitch);
                    break;
                case 'Off':
                    SmartThingsPage.waitForButtonToBeDisplayed(SmartThingsPage.bedroomLightOffSwitch);
                    break;
                default:
                    break;
            }
            break;
        case 'Bedroom Lamp':
            switch (state) {
                case 'On':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.bedroomLampOnButton);
                    break;
                case 'Off':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.bedroomLampOffButton);
                    break;
                default:
                    break;
            }
            break;
        case 'Porch Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.porchLightOnButton);
                    break;
                case 'Off':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.porchLightOffButton);
                    break;
                default:
                    break;
            }
            break;
        case 'Outside Light':
            switch (state) {
                case 'On':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.outsideLightOnButton);
                    break;
                case 'Off':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.outsideLightOffButton);
                    break;
                default:
                    break;
            }
            break;
        case 'Outdoor Lights':
            switch (state) {
                case 'On':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.outdoorLightsOnButton);
                    break;
                case 'Off':
                    SmartThingsPage.isButtonEnabled(SmartThingsPage.outdoorLightsOffButton);
                    break;
                default:
                    break;
            }
            break;
    }
});

Then(/^(Pool|Spa) heat is (increased|decreased) on Autelis page$/, (type, action) => {
    switch (type) {
        case 'Pool':
            action === 'increased' ? AutelisPage.checkPoolHeatIncreased() : AutelisPage.checkPoolHeatDecreased();
            break;
        case 'Spa':
            action === 'increased' ? AutelisPage.checkSpaHeatIncreased() : AutelisPage.checkSpaHeatDecreased();
            break;
    }
});
