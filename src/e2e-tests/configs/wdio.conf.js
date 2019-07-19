require("@babel/register");

exports.config = {

    waitTimes: {
        implicit: 15000,
        pageLoad: 30000,
        script: 15000,
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
    logLevel: "silent",
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
    baseUrl: process.env.baseUrl || "http://localhost:3000",
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
    framework: "cucumber",
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: http://webdriver.io/guide/reporters/dot.html
    reporters: [
        "spec",
    ],
    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        require: ["./step_definitions/*.js"],        // <string[]> (file/dir) require files before executing features
        backtrace: false,    // <boolean> show full backtrace for errors
        compiler: [],        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false,       // <boolean> invoke formatters without executing steps
        failFast: false,     // <boolean> abort the run on first failure
        format: ["pretty"],  // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true,        // <boolean> disable colors in formatter output
        snippets: true,      // <boolean> hide step definition snippets for pending steps
        source: true,        // <boolean> hide source uris
        profile: [],         // <string[]> (name) specify the profile to use
        strict: false,       // <boolean> fail if there are any undefined or pending steps
        tags: ["@automated"],            // <string[]> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: "", // <string> Only execute the features or scenarios with tags matching the expression.
        timeout: 90000,       // <number> timeout for step definitions
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
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: function (config, capabilities) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before: function(capabilities, specs) {
        require("@babel/register");

        browser.setTimeout({
            "implicit": this.waitTimes.implicit,
            "pageLoad": this.waitTimes.pageLoad,
            "script": this.waitTimes.script,
        });
        require('./customCommands');
    },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },

    /**
     * Runs before a Cucumber feature
     * @param {Object} feature feature details
     */
    // beforeFeature: function (feature) {
    // },
    /**
     * Runs before a Cucumber scenario
     * @param {Object} scenario scenario details
     */
    // beforeScenario: function (scenario) {
    // },
    /**
     * Runs before a Cucumber step
     * @param {Object} step step details
     */
    // beforeStep: function (step) {
    // },
    /**
     * Runs after a Cucumber step
     * @param {Object} stepResult step result
     */
    afterStep: function(stepResult) {
        if (stepResult.status === "failed") {
            const screenshotName = new Date().toUTCString()
                + "_" + stepResult.scenario.replace(/ /g, "_") + "_"
                + stepResult.text.replace(/ /g, "_")
                + ".png";
            browser.saveScreenshot("./errorShots/" + screenshotName);
        }
    },
    /**
     * Runs after a Cucumber scenario
     * @param {Object} scenario scenario details
     */
    afterScenario: function(scenario) {
        if (typeof browser.clearStorageData === "function") {
            browser.clearStorageData();
        }
        if (typeof browser.clearLocalStorage === "function") {
            browser.clearLocalStorage();
        }

        if (typeof browser.clearSessionStorage === "function") {
            browser.clearSessionStorage();
        }

        if (typeof browser.clearCache === "function") {
            browser.clearCache();
        }

        if (typeof browser.deleteAllCookies === "function") {
            browser.deleteAllCookies();
        }
    },
    /**
     * Runs after a Cucumber feature
     * @param {Object} feature feature details
     */
    // afterFeature: function (feature) {
    // },

    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function(exitCode, config, capabilities, results) {
    // },
    /**
     * Gets executed when a refresh happens.
     * @param {String} oldSessionId session ID of the old session
     * @param {String} newSessionId session ID of the new session
     */
    // onReload: function(oldSessionId, newSessionId) {
    // }
};
