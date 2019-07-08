const configBase = require('./wdio.conf.js');
const merge = require('deepmerge');

exports.config = merge(configBase.config, {
    services: ['selenium-standalone'],

    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
        },
    ]
});
