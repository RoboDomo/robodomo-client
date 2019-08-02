import { Then } from 'cucumber';

// TODO Fix this when state is persisted
import DashboardPage from '../page_objects/dashboard.page';

Then(/^Dashboard (Bathroom Light) card value is (\w+)$/, (dimmerName, value) => {
    switch (dimmerName) {
        case 'Bathroom Light':
            DashboardPage.validateBathroomLightState(value);
            break;
        default:
            break;
    }
});

Then(/^Dashboard (Bedroom Fan|Bedroom Lamp|Bedroom Light) card value is (\w+)$/, (dimmerName, value) => {
    switch (dimmerName) {
        case 'Bedroom Fan':
            DashboardPage.validateBedroomFanState(value);
            break;
        case 'Bedroom Lamp':
            DashboardPage.validateBedroomLampState(value);
            break;
        case 'Bedroom Light':
            DashboardPage.validateBedroomLightState(value);
            break;
        default:
            break;
    }
});

Then(/^Dashboard (Ceiling Fan|Ceiling Fan Light) card value is (\w+)$/, (dimmerName, value) => {
    switch (dimmerName) {
        case 'Ceiling Fan':
            DashboardPage.validateCeilingFanState(value);
            break;
        case 'Ceiling Fan Light':
            DashboardPage.validateCeilingFanLightState(value);
            break;
        default:
            break;
    }
});

Then(/^Dashboard (Kitchen Light) card value is (\w+)$/, (dimmerName, value) => {
    switch (dimmerName) {
        case 'Kitchen Light':
            DashboardPage.validateKitchenLightState(value);
            break;
        default:
            break;
    }
});
