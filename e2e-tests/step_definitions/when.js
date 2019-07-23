import { When } from 'cucumber';
import AutelisPage from '../page_objects/autelis.page';
import DashboardPage from '../page_objects/dashboard.page';
import NestPage from '../page_objects/nest.page';
import Page from '../page_objects/page';
import TheaterPage from '../page_objects/theater.page';
import WeatherPage from '../page_objects/weather.page';

When(
    /^User clicks (Autelis|Dashboard|Nest|Sensors|SmartThings|Theater|Weather) menu button$/,
    { wrapperOptions: { retry: 2 } },
    menuButton => {
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
            default:
                break;
        }
    }
);

When(/^User clicks on (Bedroom|Theater) tab$/, { wrapperOptions: { retry: 2 } }, menuButton => {
    switch (menuButton) {
        case 'Bedroom':
            DashboardPage.goToBedroomTab();
            break;
        case 'Theater':
            DashboardPage.goToTheaterTab();
            break;
        default:
            break;
    }
});

When(/^User clicks on (HomeTheater|Autelis) tab$/, { wrapperOptions: { retry: 2 } }, tabName => {
    switch (tabName) {
        case 'HomeTheater':
            TheaterPage.goToHomeTheaterTab();
            break;
        case 'Autelis':
            AutelisPage.goToAutelisTab();
            break;
        default:
            break;
    }
});

When(/^User clicks on (New York, NY|Los Angeles, CA) tab$/, { wrapperOptions: { retry: 2 } }, menuButton => {
    switch (menuButton) {
        case 'New York, NY':
            WeatherPage.goToNYTab();
            break;
        case 'Los Angeles, CA':
            WeatherPage.goToLATab();
            break;
        default:
            break;
    }
});

When(/^User clicks on (Hallway Thermostat|Entryway Nest Protect) tab$/, { wrapperOptions: { retry: 2 } }, tabName => {
    switch (tabName) {
        case 'Entryway Nest Protect':
            NestPage.goToEntrywayTab();
            break;
        case 'Hallway Thermostat':
            NestPage.goToHallwayTab();
            break;
        default:
            break;
    }
});
