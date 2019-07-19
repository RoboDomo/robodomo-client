import { Then } from 'cucumber';
import DashboardPage from '../page_objects/dashboard.page';
import Page from '../page_objects/page';

Then(/^Menu elements visuals shall match baseline$/, {}, () => {
    new Page().getMenu().validateElementsScreenshots();
});

Then(/^Dashboard tab buttons visuals shall match baseline$/, {}, () => {
    DashboardPage.validateTabButtonsScreenshots();
});

Then(/^Dashboard (Bedroom|Theater) Nest cell visuals shall match baseline$/, {}, (tabName) => {
    switch (tabName) {
        case 'Bedroom':
            DashboardPage.validateBedroomNestScreenshots();
            break;
        case 'Theater':
            DashboardPage.validateTheaterNestScreenshots();
            break;
        default:
            break;
    }
});
