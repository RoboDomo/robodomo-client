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

exports.ceilingFanLightLevel = function(value) {
    mockMQTTMessage('smartthings/Ceiling Fan Light/level', value);
};

exports.ceilingFanLightState = function(value) {
    mockMQTTMessage('smartthings/Ceiling Fan Light/switch', value);
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

exports.ceilingFanSwitch = function(value) {
    mockMQTTMessage('smartthings/Ceiling Fan/switch', value);
};

exports.ceilingFanLevel = function(value) {
    mockMQTTMessage('smartthings/Ceiling Fan/level', value);
};

exports.officeFanSwitch = function(value) {
    mockMQTTMessage('smartthings/Office Fan/switch', value);
};

exports.officeFanLevel = function(value) {
    mockMQTTMessage('smartthings/Office Fan/level', value);
};

exports.entrywayLightsSwitch = function(value) {
    mockMQTTMessage('smartthings/Entryway Lights/switch', value);
};

exports.entrywayLightsLevel = function(value) {
    mockMQTTMessage('smartthings/Entryway Lights/level', value);
};
