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

Then(/^(All Autelis SPA-POOL parameters should be turned off|Pool parameters are displayed|Spa parameters are displayed)$/, {}, (parametersStatus) => {
    switch (parametersStatus) {
        case 'All Autelis SPA-POOL parameters should be turned off':
            AutelisPage.isPoolAndSpaParametersTurnedOff();
            break;
        case 'Pool parameters are displayed':
            AutelisPage.isPoolParametersAreDisplayed();
            break;
        case 'Spa parameters are displayed':
            AutelisPage.isSpaParametersAreDisplayed();
            break;
    }
});

Then(/^Autelis (.*) button is (enabled|disabled)$/, {}, (buttonName, state) => {
    switch (buttonName) {
        case 'Solar':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.solarOnButton) :
                AutelisPage.isButtonDisabled(AutelisPage.solarOffButton);
            break;
        case 'Cleaner':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.cleanerOnButton) :
                AutelisPage.isButtonDisabled(AutelisPage.cleanerOffButton);
            break;
        case 'Pool Heat':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.poolHeatOnButton) :
                AutelisPage.isButtonDisabled(AutelisPage.poolHeatOffButton);
            break;
        case 'Pool Light':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.poolLightOnButton) :
                AutelisPage.isButtonDisabled(AutelisPage.poolLightOffButton);
            break;
        case 'Waterfall':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.waterfallOnButton) :
                AutelisPage.isButtonDisabled(AutelisPage.waterfallOffButton);
            break;
        case 'Spa Heat':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.spaHeatOnButton) :
                AutelisPage.isButtonDisabled(AutelisPage.spaHeatOffButton);
            break;
        case 'Jets':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.jetsOnButton) :
                AutelisPage.isButtonDisabled(AutelisPage.jetsOffButton);
            break;
        case 'Spa Light':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.spaLightOnButton) :
                AutelisPage.isButtonDisabled(AutelisPage.spaLightOffButton);
            break;
        case 'Blower':
            state === 'enabled' ? AutelisPage.isButtonEnabled(AutelisPage.blowerOnButton) :
                AutelisPage.isButtonDisabled(AutelisPage.blowerOffButton);
            break;
    }
});
