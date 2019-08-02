const merge = require('deepmerge');
const configBase = require('./wdio.conf.js');

exports.config = merge(configBase.config, {
    maxInstances: 3,

    services: ['browserstack'],
    browserstackLocal: true,
    browserstackOpts: {},

    // eslint-disable-next-line no-unused-vars
    beforeSession: function(config, capabilities, specs) {
        Object.assign(capabilities, {
            'browserstack.networkLogs': 'true',
            'browserstack.console': 'verbose',
        });
    },
});
