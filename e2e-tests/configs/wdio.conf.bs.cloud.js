const merge = require('deepmerge');
const configBase = require('./wdio.conf.js');

exports.config = merge(configBase.config, {
    specs: [
        './features/**/*.feature',
    ],
    exclude: [
        './features/visualRegression/*.feature',
    ],

    maxInstances: 5,

    services: ['browserstack'],
    browserstackLocal: true,
    browserstackOpts: {},

    capabilities: [
        {
            device: 'iPad Pro 12.9 2018',
            os_version: '12',
            realMobile: true,
            deviceOrientation: 'landscape',
        // TODO uncomment when iOS UI is fixed
        // and when tests are updated for Android UI
        },
        // {
        //     device: 'iPhone 8',
        //     os_version: '12',
        //     realMobile: true,
        //     deviceOrientation: 'landscape',
        // },
        // {
        //     device: 'iPhone XS',
        //     os_version: '12',
        //     realMobile: true,
        //     deviceOrientation: 'landscape',
        // },
        {
            device: 'Samsung Galaxy Tab S4',
            os_version: '8.1',
            realMobile: true,
            deviceOrientation: 'landscape',
        },
        // {
        //     device: 'Google Pixel 3',
        //     os_version: '9.0',
        //     realMobile: true,
        //     deviceOrientation: 'landscape',
        // },
        // {
        //     device: 'Samsung Galaxy S10',
        //     os_version: '9.0',
        //     realMobile: true,
        //     deviceOrientation: 'landscape',
        // },
        {
            os: 'Windows',
            os_version: '10',
            browser: 'Chrome',
            resolution: '1920x1080',
        },
        {
            os: 'Windows',
            os_version: '10',
            browser: 'Firefox',
            resolution: '1920x1080',
        },
        {
            os: 'OS X',
            os_version: 'Mojave',
            browser: 'Chrome',
            resolution: '1920x1080',
        },
        {
            os: 'OS X',
            os_version: 'Mojave',
            browser: 'Firefox',
            resolution: '1920x1080',
        },
        {
            os: 'OS X',
            os_version: 'Mojave',
            browser: 'Safari',
            resolution: '1920x1080',
        },
    ],
});
