const merge = require('deepmerge');
const configBase = require('./wdio.conf.bs.cloud');

exports.config = merge(configBase.config, {
    specs: ['./features/**/*.feature'],
    exclude: ['./features/visualRegression/*.feature'],
});
