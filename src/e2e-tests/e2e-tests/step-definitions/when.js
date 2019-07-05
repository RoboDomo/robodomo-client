import { When } from 'cucumber';
import AutelisPage from '../page-objects/autelis.page';
import DashboardPage from '../page-objects/dashboard.page';
import NestPage from '../page-objects/nest.page';
import Page from '../page-objects/page'
import SensorsPage from '../page-objects/sensors.page';
import SmartThingsPage from '../page-objects/smartthings.page';
import TheaterPage from '../page-objects/theater.page';
import WeatherPage from '../page-objects/weather.page';

When(/^User clicks (Autelis|Dashboard|Nest|Sensors|SmartThings|Theater|Weather) menu button$/, { wrapperOptions: { retry: 2 } }, (menuButton) => {
    switch (menuButton) {
        case 'Autelis':
            new Page('','/').getMenu().goToAutelisPage();
            break;
        case 'Dashboard':
            new Page('','/').getMenu().goToDashboardPage();
            break;
        case 'Nest':
            new Page('','/').getMenu().goToNestPage();
            break;
        case 'Sensors':
            new Page('','/').getMenu().goToSensorsPage();
            break;
        case 'SmartThings':
            new Page('','/').getMenu().goToSmartThingsPage();
            break;
        case 'Theater':
            new Page('','/').getMenu().goToTheaterPage();
            break;
        case 'Weather':
            new Page('','/').getMenu().goToWeatherPage();
            break;
    }
});

When(/^User clicks on (Bedroom|Theater) tab$/, { wrapperOptions: { retry: 2 } }, (menuButton) => {
    switch (menuButton) {
        case 'Bedroom':
            DashboardPage.goToBedroomTab();
            break;
        case 'Theater':
            DashboardPage.goToTheaterTab();
            break;
    }
});
