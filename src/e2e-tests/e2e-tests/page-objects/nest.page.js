// nest.page.js
import Page from './page';
import MenuComponent from './menu.component';

class NestPage extends Page {

    get pageContent() { return $('//div[contains(@class, "ion-page")]') }

}

module.exports = new NestPage('', '/nest');
