
const { join } = require('path');
const merge = require('deepmerge');
const configBase = require('./wdio.conf.js');

exports.config = merge(configBase.config, {
    specs: [
        './features/**/*.feature',
    ],
    // exclude: [
    //     './features/visualRegression/*.feature'
    // ],
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 1,

    services: [
        'selenium-standalone',
        ['image-comparison',
            {
                autoSaveBaseline: true,
                baselineFolder: join(process.cwd(), './baseScreenshots/'),
                blockOutStatusBar: true,
                blockOutToolBar: true,
                clearRuntimeFolder: false,
                formatImageName: '{tag}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
                savePerInstance: true,
            }]],

    capabilities: [
        {
            browserName: 'chrome',
        },
    ],
});
