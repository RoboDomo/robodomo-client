import {When} from 'cucumber';
import AutelisPage from '../page-objects/autelis.page';
import DashboardPage from '../page-objects/dashboard.page';
import NestPage from '../page-objects/nest.page';
import Page from '../page-objects/page'
import SensorsPage from '../page-objects/sensors.page';
import SmartThingsPage from '../page-objects/smartthings.page';
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
