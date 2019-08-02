const merge = require('deepmerge');
const configBase = require('./wdio.conf.bs.cloud');

exports.config = merge(configBase.config, {
    specs: ['./features/**/*.feature'],
    exclude: ['./features/visualRegression/*.feature'],

    capabilities: [
        {
            device: 'iPad Pro 12.9 2018',
            os_version: '12',
            realMobile: true,
            deviceOrientation: 'landscape',
            exclude: ['./features/mqtt/*.feature'],
        },
        {
            device: 'Samsung Galaxy Tab S4',
            os_version: '8.1',
            realMobile: true,
            deviceOrientation: 'landscape',
            exclude: ['./features/mqtt/*.feature'],
        },
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
            browser: 'Safari',
            resolution: '1920x1080',
        },
    ],
});
