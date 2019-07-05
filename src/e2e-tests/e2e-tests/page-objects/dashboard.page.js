// dashboard.page.js
import Page from './page';
import MenuComponent from './menu.component';

class DashboardPage extends Page {

    get pageContent() { return $('//div[contains(@class, "ion-page")]') }

}

module.exports = new DashboardPage('', '/dashboard');