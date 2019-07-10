import { Given } from 'cucumber';
import AutelisPage from '../page-objects/autelis.page';
import DashboardPage from '../page-objects/dashboard.page';
import NestPage from '../page-objects/nest.page';
import Page from '../page-objects/page'
import SensorsPage from '../page-objects/sensors.page';
import SmartThingsPage from '../page-objects/smartthings.page';
import TheaterPage from '../page-objects/theater.page';
import WeatherPage from '../page-objects/weather.page';

Given(/^User loads the RoboDomo web app$/, { wrapperOptions: { retry: 2 } }, () => {
    new Page('','/').open();
});


Given(/^User navigates to (Autelis|Dashboard|Nest|Sensors|SmartThings|Theater|Weather) page$/, { wrapperOptions: { retry: 2 } }, (page) => {
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
    }
});
