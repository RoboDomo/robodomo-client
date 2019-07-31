import { When } from 'cucumber';
import {
    ceilingFanLevel,
    ceilingFanLightLevel,
    ceilingFanLightState,
    ceilingFanSwitch,
    entrywayLightsLevel,
    entrywayLightsSwitch,
    kitchenLightLevel,
    kitchenLightState,
    officeDimmerLevel,
    officeDimmerState,
    officeFanLevel,
    officeFanSwitch,
    officeLightLevel,
    officeLightState
} from '../configs/testData';

When(/^MQTT message set (Ceiling Fan Light|Office Dimmer|Office Light|Kitchen Light) dimmer to state (\w+) on SmartThings page$/, (dimmerName, state) => {
    switch (dimmerName) {
        case 'Ceiling Fan Light':
            ceilingFanLightState(state);
            break;
        case 'Office Dimmer':
            officeDimmerState(state);
            break;
        case 'Office Light':
            officeLightState(state);
            break;
        case 'Kitchen Light':
            kitchenLightState(state);
            break;
        default:
            break;
    }
});

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
