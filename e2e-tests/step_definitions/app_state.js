import { When } from 'cucumber';
import {
    bathroomLightLevel,
    bathroomLightState,
    bedroomFanLevel,
    bedroomFanState,
    bedroomLampState,
    bedroomLightLevel,
    bedroomLightState,
    ceilingFanLevel,
    ceilingFanLightLevel,
    ceilingFanLightState,
    ceilingFanState,
    entrywayLightsState,
    kitchenLightLevel,
    kitchenLightState,
    officeDimmerLevel,
    officeDimmerState,
    officeFanLevel,
    officeFanState,
    officeLightLevel,
    officeLightState,
    outdoorLightsState,
    outsideLightsState,
    porchLightState
} from '../configs/testData';

When(/^MQTT message set (Bathroom Light) to state (\w+)(| and value (\w+))$/, (objectName, state, level) => {
    switch (objectName) {
        case 'Bathroom Light':
            bathroomLightState(state);
            if (level && level !== '0')
                bathroomLightLevel(level);
            break;
        default:
            break;
    }
});

When(/^MQTT message set (Bedroom Lamp|Bedroom Fan|Bedroom Light) to state (\w+)(| and value (\w+))$/, (objectName, state, level) => {
    switch (objectName) {
        case 'Bedroom Lamp':
            bedroomLampState(state);
            break;
        case 'Bedroom Fan':
            bedroomFanState(state);
            if (level && level !== '0')
                bedroomFanLevel(level);
            break;
        case 'Bedroom Light':
            bedroomLightState(state);
            if (level && level !== '0')
                bedroomLightLevel(level);
            break;
        default:
            break;
    }
});

When(/^MQTT message set (Ceiling Fan Light|Ceiling Fan|Entryway Lights) to state (\w+)(| and value (\w+))$/, (objectName, state, level) => {
    switch (objectName) {
        case 'Ceiling Fan Light':
            ceilingFanLightState(state);
            if (level && level !== '0')
                ceilingFanLightLevel(level);
            break;
        case 'Ceiling Fan':
            ceilingFanState(state);
            if (level && level !== '0')
                ceilingFanLevel(level);
            break;
        case 'Entryway Lights':
            entrywayLightsState(state);
            break;
        default:
            break;
    }
});

When(/^MQTT message set (Kitchen Light) to state (\w+)(| and value (\w+))$/, (objectName, state, level) => {
    switch (objectName) {
        case 'Kitchen Light':
            kitchenLightState(state);
            if (level && level !== '0')
                kitchenLightLevel(level);
            break;
        default:
            break;
    }
});

When(/^MQTT message set (Office Dimmer|Office Light|Office Fan) to state (\w+)(| and value (\w+))$/, (objectName, state, level) => {
    switch (objectName) {
        case 'Office Dimmer':
            officeDimmerState(state);
            if (level && level !== '0')
                officeDimmerLevel(level);
            break;
        case 'Office Fan':
            officeFanState(state);
            if (level && level !== '0')
                officeFanLevel(level);
            break;
        case 'Office Light':
            officeLightState(state);
            if (level && level !== '0')
                officeLightLevel(level);
            break;
        default:
            break;
    }
});

When(/^MQTT message set (Outdoor Lights|Outside Light|Porch Light) to state (\w+)$/, (objectName, state) => {
    switch (objectName) {
        case 'Outdoor Lights':
            outdoorLightsState(state);
            break;
        case 'Outside Light':
            outsideLightsState(state);
            break;
        case 'Porch Light':
            porchLightState(state);
            break;
        default:
            break;
    }
});
