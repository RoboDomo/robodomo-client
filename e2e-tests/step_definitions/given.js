import { Given } from 'cucumber';
import AutelisPage from '../page_objects/autelis.page';
import DashboardPage from '../page_objects/dashboard.page';
import NestPage from '../page_objects/nest.page';
import Page from '../page_objects/page';
import SensorsPage from '../page_objects/sensors.page';
import SmartThingsPage from '../page_objects/smartthings.page';
import TheaterPage from '../page_objects/theater.page';
import WeatherPage from '../page_objects/weather.page';

Given(/^User loads the RoboDomo web app$/, { wrapperOptions: { retry: 2 } }, () => {
    new Page('', '/').open();
});

Given(
    /^User navigates to (Autelis|Dashboard|Nest|Sensors|SmartThings|Theater|Weather) page$/,
    { wrapperOptions: { retry: 2 } },
    page => {
        switch (page) {
            case 'Autelis':
                AutelisPage.open();
                break;
            case 'Dashboard':
                DashboardPage.open();
                break;
            case 'Nest':
                NestPage.open();
                break;
            case 'Sensors':
                SensorsPage.open();
                break;
            case 'SmartThings':
                SmartThingsPage.open();
                break;
            case 'Theater':
                TheaterPage.open();
                break;
            case 'Weather':
                WeatherPage.open();
                break;
            default:
                break;
        }
    }
);
