import { When } from 'cucumber';
import {
    ceilingFanLevel,
    ceilingFanLightLevel,
    ceilingFanSwitch,
    entrywayLightsLevel,
    entrywayLightsSwitch,
    kitchenLightLevel,
    officeDimmerLevel,
    officeFanLevel,
    officeFanSwitch,
    officeLightLevel
} from '../scripts/testData';

When(/^MQTT message set (Ceiling Fan Light|Office Dimmer|Office Light|Kitchen Light) dimmer to value (\w+) on SmartThings page$/, (dimmerName, value) => {
    switch (dimmerName) {
        case 'Ceiling Fan Light':
            ceilingFanLightLevel(value);
            break;
        case 'Office Dimmer':
            officeDimmerLevel(value);
            break;
        case 'Office Light':
            officeLightLevel(value);
            break;
        case 'Kitchen Light':
            kitchenLightLevel(value);
            break;
        default:
            break;
    }
});

When(/^MQTT message set (Ceiling Fan|Office Fan|Entryway Lights) to (\w+) and (\w+) on SmartThings page$/, (optionName, state, value) => {
    switch (optionName) {
        case 'Ceiling Fan':
            ceilingFanSwitch(state);
            ceilingFanLevel(value);
            break;
        case 'Office Fan':
            officeFanSwitch(state);
            officeFanLevel(value);
            break;
        case 'Entryway Lights':
            entrywayLightsSwitch(state);
            entrywayLightsLevel(state);
            break;
        default:
            break;
    }
});
