import { When } from 'cucumber'
import Page from "../page-objects/page";

When(/^User clicks (Autelis|Dashboard|Nest|Sensors|SmartThings|Theater|Weather) tab$/, { wrapperOptions: { retry: 2 } }, (menuButton) => {
    switch (menuButton) {
        case 'Autelis':
            new Page('','/').getMenu().clickAutelisButton();
            break;
        case 'Dashboard':
            new Page('','/').getMenu().clickDashboardButton();
            break;
        case 'Nest':
            new Page('','/').getMenu().clickNestButton();
            break;
        case 'Sensors':
            new Page('','/').getMenu().clickSensorsButton();
            break;
        case 'SmartThings':
            new Page('','/').getMenu().clickSmartThingsButton();
            break;
        case 'Theater':
            new Page('','/').getMenu().clickTheaterButton();
            break;
        case 'Weather':
            new Page('','/').getMenu().clickWeatherButton();
            break;
    }
});


