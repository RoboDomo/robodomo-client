import Page from './page';

/** SensorsPage selenium page-object */
class SensorsPage extends Page {
    get pageContent() {
        return $('//div[contains(@class, "ion-page")]');
    }
}

module.exports = new SensorsPage('', '/sensors');
