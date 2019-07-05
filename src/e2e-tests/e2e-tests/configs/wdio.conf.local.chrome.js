const merge = require('deepmerge');
const configBase = require('./wdio.conf.js');

exports.config = merge(configBase.config, {
    services: ['selenium-standalone'],

    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
        },
    ]
});
