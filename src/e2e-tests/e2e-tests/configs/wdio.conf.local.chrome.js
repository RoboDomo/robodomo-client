const merge = require('deepmerge')
const configBase = require('./wdio.conf.js')

exports.config = merge(configBase.config, {
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
        },
    ],
    onPrepare: () => {
        if (this.config.chromeDriver) {
            require('./chromedriver').start(this.config)
        }
    },
    after: () => {
        if (this.config.chromeDriver) {
            require('./chromedriver').stop()
        }
    },
    chromeDriver: true,
})
