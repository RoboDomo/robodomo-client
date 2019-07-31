require('@babel/register');

const log = (typeof console != 'undefined') && console;

exports.config = {
    waitTimes: {
        implicit: 15000,
        pageLoad: 45000,
        script: 10000,
    },
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    // runner: 'local',
    // port: 4723,
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        // './features/**/*.feature'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    // maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'silent',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner, @wdio/lambda-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // Enables colors for log output.
    coloredLogs: true,
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: process.env.baseUrl || 'http://localhost:3000',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    // services: ['appium','browserstack','selenium-standalone'],
    //
    // Appium Service config
    // see details: https://webdriver.io/docs/appium-service.html
    // appium: {
    //     command: 'appium',
    // },
    //
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async way
    // e.g. using promises you can set the sync option to false.
    sync: true,
    //
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber',
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: http://webdriver.io/guide/reporters/dot.html
    reporters: ['dot'],
    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        require: ['./step_definitions/*.js'], // <string[]> (file/dir) require files before executing features
        backtrace: false, // <boolean> show full backtrace for errors
        compiler: [], // <string[]> ('extension:module') require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false, // <boolean> invoke formatters without executing steps
        failFast: false, // <boolean> abort the run on first failure
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true, // <boolean> disable colors in formatter output
        snippets: true, // <boolean> hide step definition snippets for pending steps
        source: true, // <boolean> hide source uris
        profile: [], // <string[]> (name) specify the profile to use
        strict: false, // <boolean> fail if there are any undefined or pending steps
        tags: [], // <string[]> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: '', // <string> Only execute the features or scenarios with tags matching the expression.
        timeout: 60000, // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
    },

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.

    // eslint-disable-next-line no-unused-vars
    onPrepare: function(config, capabilities) {
        let filessystem = require('fs');
        let dir = './errorShots/';

        if (!filessystem.existsSync(dir)) {
            filessystem.mkdirSync(dir);
        } else {
            log.info('Folder already exists!');
        }
    },

    // eslint-disable-next-line no-unused-vars
    before(capabilities, specs) {
        require('@babel/register');

        const customCommands = require('./customCommands');
        Object.getOwnPropertyNames(customCommands).forEach(key => {
            customCommands[key]; // eslint-disable-line no-unused-expressions
        });

        try {
            browser.setTimeout({ implicit: this.waitTimes.implicit });
        } catch (exeption) {
            log.warn(exeption.message);
        }
        try {
            browser.setTimeout({ pageLoad: this.waitTimes.pageLoad });
        } catch (exeption) {
            log.warn(exeption.message);
        }
        try {
            browser.setTimeout({ script: this.waitTimes.script });
        } catch (exeption) {
            log.warn(exeption.message);
        }
        try {
            browser.maximizeWindow();
        } catch (exeption) {
            log.warn(exeption.message);
        }
    },

    // eslint-disable-next-line no-unused-vars
    beforeScenario: function(uri, feature, scenario) {
        browser.scenarioContext = {};
    },

    afterStep(uri, feature, scenario, step, result) {
        if (result.status === 'failed') {
            log.warn(`Spec '${feature.name}' '${scenario.name}' failed`);
            log.warn(`Browser sessionId= ${browser.sessionId}`);
            const screenshotName = `${new Date().toUTCString()}_${scenario.name.replace(/ /g, '_')}_${browser.sessionId}.png`;
            browser.saveScreenshot(`./errorShots/${screenshotName}`);
        }
    },
    /**
     * Runs after a Cucumber scenario
     * @param {Object} scenario scenario details
     */
    // eslint-disable-next-line no-unused-vars
    afterScenario(uri, feature, scenario, result) {
        try {
            if (typeof browser.clearStorageData === 'function') {
                browser.clearStorageData();
            }
        } catch (exeption) {
            log.warn(exeption.message);
        }
        try {
            if (typeof browser.clearStorageData === 'function') {
                browser.clearLocalStorage();
            }
        } catch (exeption) {
            log.warn(exeption.message);
        }
        try {
            if (typeof browser.clearStorageData === 'function') {
                browser.clearSessionStorage();
            }
        } catch (exeption) {
            log.warn(exeption.message);
        }
        try {
            if (typeof browser.clearStorageData === 'function') {
                browser.clearCache();
            }
        } catch (exeption) {
            log.warn(exeption.message);
        }
        try {
            if (typeof browser.clearStorageData === 'function') {
                browser.deleteAllCookies();
            }
        } catch (exeption) {
            log.warn(exeption.message);
        }
    },
};
