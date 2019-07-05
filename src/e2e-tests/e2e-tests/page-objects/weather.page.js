// weather.page.js
import Page from './page';
import MenuComponent from './menu.component';

class WeatherPage extends Page {

    get pageContent() { return $('//div[contains(@class, "ion-page")]') }

}

module.exports = new WeatherPage('', '/weather');
