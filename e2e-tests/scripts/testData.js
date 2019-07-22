const mockMQTTMessage = function(topic, value) {
    browser.execute((topic, value) => {
        SEND_MQTT_MESSAGE(topic, value);
    }, topic, value);
};

exports.ceilingFanLightLevel = function(value) { mockMQTTMessage('smartthings/Ceiling Fan Light/level', value); };

exports.kitchenLightLevel = function(value) { mockMQTTMessage('smartthings/Kitchen Light/level', value); };

exports.officeDimmerLevel = function(value) { mockMQTTMessage('smartthings/Office Dimmer/level', value); };

exports.officeLightLevel = function(value) { mockMQTTMessage('smartthings/Office Light/level', value); };

exports.ceilingFanSwitch = function(value) { mockMQTTMessage('smartthings/Ceiling Fan/switch', value); };

exports.ceilingFanLevel = function(value) { mockMQTTMessage('smartthings/Ceiling Fan/level', value)};

exports.officeFanSwitch = function(value) { mockMQTTMessage('smartthings/Office Fan/switch', value); };

exports.officeFanLevel = function(value) { mockMQTTMessage('smartthings/Office Fan/level', value); };

exports.entrywayLightsSwitch = function(value) { mockMQTTMessage('smartthings/Entryway Lights/switch', value); };
