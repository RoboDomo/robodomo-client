/* eslint max-len: ['error', { 'ignoreComments': true, 'ignoreStrings': true, 'ignoreTrailingComments': true }] */
/* eslint lines-between-class-members: ["error", "always", { exceptAfterSingleLine: true }] */
/* eslint class-methods-use-this: [0] */

import Page from './page';

/** SmartThingsPage selenium page-object */
class SmartThingsPage extends Page {
    get pageContent() { return $('//div[contains(@class, "ion-page")]'); }
}

module.exports = new SmartThingsPage('', '/smartthings');
