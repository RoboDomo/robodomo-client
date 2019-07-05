import { Then } from 'cucumber'
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

Then (/^(Autelis|Dashboard|Nest|Sensors|SmartThings|Theater|Weather) tab shall be selected$/, {}, (tab) => {
        switch (tab) {
        case 'Autelis':
            AutelisPage.getMenu().isAutelisTabSelected();
            break;
        case 'Dashboard':
            DashboardPage.getMenu().isDashboardTabSelected();
            break;
        case 'Nest':
            NestPage.getMenu().isNestTabSelected();
            break;
        case 'Sensors':
            SensorsPage.getMenu().isSensorsTabSelected();
            break;
        case 'SmartThings':
            SmartThingsPage.getMenu().isSmartThingsTabSelected();
            break;
        case 'Theater':
            TheaterPage.getMenu().isTheaterTabSelected();
            break;
        case 'Weather':
            WeatherPage.getMenu().isWeatherTabSelected();
            break;
    }
});
