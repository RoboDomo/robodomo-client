import { Then } from 'cucumber';
import AutelisPage from '../page_objects/autelis.page';
import DashboardPage from '../page_objects/dashboard.page';
import NestPage from '../page_objects/nest.page';
import SensorsPage from '../page_objects/sensors.page';
import SmartThingsPage from '../page_objects/smartthings.page';
import TheaterPage from '../page_objects/theater.page';
import WeatherPage from '../page_objects/weather.page';

Then(/^User is redirected to (Autelis|Dashboard|Nest|Sensors|SmartThings|Theater|Weather) page$/, {}, page => {
    let path;
    switch (page) {
        case 'Autelis':
            path = AutelisPage.path;
            break;
        case 'Dashboard':
            path = DashboardPage.path;
            break;
        case 'Nest':
            path = NestPage.path;
            break;
        case 'Sensors':
            path = SensorsPage.path;
            break;
        case 'SmartThings':
            path = SmartThingsPage.path;
            break;
        case 'Theater':
            path = TheaterPage.path;
            break;
        case 'Weather':
            path = WeatherPage.path;
            break;
        default:
            path = undefined;
            break;
    }
    browser.waitUntil(() => browser.getUrl().includes(path), 5000);
});

Then(/^(Autelis|Dashboard|Nest|Sensors|SmartThings|Theater|Weather) menu shall be selected$/, {}, menuButton => {
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

Then(/^(Theater|Bedroom) tab is loaded$/, {}, tabButton => {
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
Then(/^(HomeTheater) tab is loaded$/, {}, tabName => {
    TheaterPage.isHomeTheaterTabSelected();
});

Then(/^(Los Angeles, CA|New York, NY) tab is loaded$/, {}, tabButton => {
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

Then(/^(Hallway Thermostat|Entryway Nest Protect) tab is loaded$/, {}, tabName => {
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
