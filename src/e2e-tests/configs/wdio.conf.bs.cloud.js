const configBase = require('./wdio.conf.js');
const merge = require('deepmerge');

exports.config = merge(configBase.config, {
    specs: [
        './features/**/*.feature'
    ],
    exclude: [
        './features/visualRegression/*.feature'
    ],
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 5,


    services: ['browserstack'],
    browserstackLocal: true,
    browserstackOpts: {},

    capabilities: [
        // TODO uncomment when iOS UI is fixed and when tests are updated for Android UI
        {
            'device': 'iPad Pro 12.9 2018',
            'os_version': '12',
            'realMobile': true,
            'deviceOrientation': 'landscape',
        },
        // {
        //     'device': 'iPhone 8',
        //     'os_version': '12',
        //     'realMobile': true,
        //     'deviceOrientation': 'landscape',
        // },
        // {
        //     'device': 'iPhone XS',
        //     'os_version': '12',
        //     'realMobile': true,
        //     'deviceOrientation': 'landscape',
        // },
        {
            'device': 'Samsung Galaxy Tab S4',
            'os_version': '8.1',
            'realMobile': true,
            'deviceOrientation': 'landscape',
        },
        // {
        //     'device': 'Google Pixel 3',
        //     'os_version': '9.0',
        //     'realMobile': true,
        //     'deviceOrientation': 'landscape',
        // },
        // {
        //     'device': 'Samsung Galaxy S10',
        //     'os_version': '9.0',
        //     'realMobile': true,
        //     'deviceOrientation': 'landscape',
        // },
        {
            'os': 'Windows',
            'os_version': '10',
            'browser': 'Chrome',
            'resolution': '1920x1080'
        },
        {
            'os': 'Windows',
            'os_version': '10',
            'browser': 'Firefox',
            'resolution': '1920x1080'
        },
        {
            'os': 'OS X',
            'os_version': 'Mojave',
            'browser': 'Chrome',
            'resolution': '1920x1080'
        },
        {
            'os': 'OS X',
            'os_version': 'Mojave',
            'browser': 'Firefox',
            'resolution': '1920x1080'
        },
        {
            'os': 'OS X',
            'os_version': 'Mojave',
            'browser': 'Safari',
            'resolution': '1920x1080'
        },
    ]
});
