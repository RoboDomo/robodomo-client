const merge = require('deepmerge');
const configBase = require('./wdio.conf.js');

exports.config = merge(configBase.config, {
    maxInstances: 3,

    services: ['browserstack'],
    browserstackLocal: true,
    browserstackOpts: {},
});
