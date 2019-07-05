# Robodomo-UI-tests

## Summary

-   [Installation and preparation](#installation-and-preparation)
-   [Test run commands](#test-run-commands)

## Installation and preparation

Install the following:

NodeJS latest stable version `https://nodejs.org/en/download/`

Java JDK `https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html`

Google Chrome browser latest stable version `https://www.google.com/chrome/`

Before tests could be run all required libraries have to be fetched from npm repository.

Run `npm i` in project root `../react-client/src/e2e-tests`, then run `npm run setup`

Run `cd e2e-tests`, then `npm i` in test subdirectory `../react-client/src/e2e-tests/e2e-tests`

## Test run commands

To start running tests execute the following commands in `../react-client/src/e2e-tests/e2e-tests` directory:

-   `npm run test:cucumber` - run tests against local environment using Chrome (UI) browser
-   `npm run test:cucumber -- --baseUrl=URL` - run tests against environment defined as URL using Chrome (UI) browser