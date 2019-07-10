const configBase = require('./wdio.conf.js');
const merge = require('deepmerge');

exports.config = merge(configBase.config, {
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 1,

    services: ['selenium-standalone'],

    capabilities: [
        {
            browserName: 'chrome',
        },
    ]
});
