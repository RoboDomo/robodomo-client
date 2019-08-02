const mockMQTTMessage = function(topic, value) {
    browser.execute(
        (topic, value) => {
            SEND_MQTT_MESSAGE(topic, value);
        },
        topic,
        value
    );
    browser.pause(500);
};

exports.bathroomLightLevel = function(value) {
    mockMQTTMessage('smartthings/Bathroom Light/level', value);
};

exports.bathroomLightState = function(value) {
    mockMQTTMessage('smartthings/Bathroom Light/switch', value);
};

exports.bedroomFanLevel = function(value) {
    mockMQTTMessage('smartthings/Bedroom Fan/level', value);
};

exports.bedroomFanState = function(value) {
    mockMQTTMessage('smartthings/Bedroom Fan/switch', value);
};

exports.bedroomLampState = function(value) {
    mockMQTTMessage('smartthings/Bedroom Lamp/switch', value);
};

exports.bedroomLightLevel = function(value) {
    mockMQTTMessage('smartthings/Bedroom Light/level', value);
};

exports.bedroomLightState = function(value) {
    mockMQTTMessage('smartthings/Bedroom Light/switch', value);
};

exports.ceilingFanLevel = function(value) {
    mockMQTTMessage('smartthings/Ceiling Fan/level', value);
};

exports.ceilingFanState = function(value) {
    mockMQTTMessage('smartthings/Ceiling Fan/switch', value);
};

exports.ceilingFanLightLevel = function(value) {
    mockMQTTMessage('smartthings/Ceiling Fan Light/level', value);
};

exports.ceilingFanLightState = function(value) {
    mockMQTTMessage('smartthings/Ceiling Fan Light/switch', value);
};

exports.entrywayLightsState = function(value) {
    mockMQTTMessage('smartthings/Entryway Lights/switch', value);
};

exports.kitchenLightLevel = function(value) {
    mockMQTTMessage('smartthings/Kitchen Light/level', value);
};

exports.kitchenLightState = function(value) {
    mockMQTTMessage('smartthings/Kitchen Light/switch', value);
};

exports.officeDimmerLevel = function(value) {
    mockMQTTMessage('smartthings/Office Dimmer/level', value);
};

exports.officeDimmerState = function(value) {
    mockMQTTMessage('smartthings/Office Dimmer/switch', value);
};

exports.officeLightLevel = function(value) {
    mockMQTTMessage('smartthings/Office Light/level', value);
};

exports.officeLightState = function(value) {
    mockMQTTMessage('smartthings/Office Light/switch', value);
};

exports.officeFanLevel = function(value) {
    mockMQTTMessage('smartthings/Office Fan/level', value);
};

exports.officeFanState = function(value) {
    mockMQTTMessage('smartthings/Office Fan/switch', value);
};

exports.outdoorLightsState = function(value) {
    mockMQTTMessage('smartthings/Outdoor Light/switch', value);
};

exports.outsideLightsState = function(value) {
    mockMQTTMessage('smartthings/Outside Light/switch', value);
};

exports.porchLightState = function(value) {
    mockMQTTMessage('smartthings/Porch Light/switch', value);
};
