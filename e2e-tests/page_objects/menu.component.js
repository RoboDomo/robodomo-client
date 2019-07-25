import expect from 'expect';

/** MenuComponent selenium page-object */
class MenuComponent {
    get autelisButton() {
        return $('//ion-tab-button[@tab="autelis"]');
    }

    get dashboardButton() {
        return $('//ion-tab-button[@tab="dashboard"]');
    }

    get nestButton() {
        return $('//ion-tab-button[@tab="nest"]');
    }

    get sensorsButton() {
        return $('//ion-tab-button[@tab="sensors"]');
    }

    get smartThingsButton() {
        return $('//ion-tab-button[@tab="smartthings"]');
    }

    get theaterButton() {
        return $('//ion-tab-button[@tab="theater"]');
    }

    get weatherButton() {
        return $('//ion-tab-button[@tab="weather"]');
    }

    goToAutelisPage() {
        this.autelisButton.click();
    }

    goToDashboardPage() {
        this.dashboardButton.click();
    }

    goToNestPage() {
        this.nestButton.click();
    }

    goToSensorsPage() {
        this.sensorsButton.click();
    }

    goToSmartThingsPage() {
        this.smartThingsButton.click();
    }

    goToTheaterPage() {
        this.theaterButton.click();
    }

    goToWeatherPage() {
        this.weatherButton.click();
    }

    isAutelisMenuSelected() {
        browser.waitUntil(() => this.autelisButton.getAttribute('aria-selected') === 'true', 20000);
        this.autelisButton.waitForEnabled();
        expect(this.autelisButton.getAttribute('class')).toContain('tab-selected');
    }

    isDashboardMenuSelected() {
        browser.waitUntil(() => this.dashboardButton.getAttribute('aria-selected') === 'true', 20000);
        this.dashboardButton.waitForEnabled();
        expect(this.dashboardButton.getAttribute('class')).toContain('tab-selected');
    }

    isNestMenuSelected() {
        browser.waitUntil(() => this.nestButton.getAttribute('aria-selected') === 'true', 20000);
        this.nestButton.waitForEnabled();
        expect(this.nestButton.getAttribute('class')).toContain('tab-selected');
    }

    isSensorsMenuSelected() {
        browser.waitUntil(() => this.sensorsButton.getAttribute('aria-selected') === 'true', 20000);
        this.sensorsButton.waitForEnabled();
        expect(this.sensorsButton.getAttribute('class')).toContain('tab-selected');
    }

    isSmartThingsMenuSelected() {
        browser.waitUntil(() => this.smartThingsButton.getAttribute('aria-selected') === 'true', 20000);
        this.smartThingsButton.waitForEnabled();
        expect(this.smartThingsButton.getAttribute('class')).toContain('tab-selected');
    }

    isTheaterMenuSelected() {
        browser.waitUntil(() => this.theaterButton.getAttribute('aria-selected') === 'true', 20000);
        this.theaterButton.waitForEnabled();
        expect(this.theaterButton.getAttribute('class')).toContain('tab-selected');
    }

    isWeatherMenuSelected() {
        browser.waitUntil(() => this.weatherButton.getAttribute('aria-selected') === 'true', 20000);
        this.weatherButton.waitForEnabled();
        expect(this.weatherButton.getAttribute('class')).toContain('tab-selected');
    }

    validateElementsScreenshots() {
        expect(browser.checkElement(this.autelisButton, 'MenuComponent_autelisButton')).toEqual(0);
        this.goToAutelisPage();
        expect(browser.checkElement(this.autelisButton, 'MenuComponent_autelisButton_Active')).toEqual(0);

        expect(browser.checkElement(this.dashboardButton, 'MenuComponent_dashboardButton')).toEqual(0);
        this.goToDashboardPage();
        expect(browser.checkElement(this.dashboardButton, 'MenuComponent_dashboardButton_Active')).toEqual(0);

        expect(browser.checkElement(this.nestButton, 'MenuComponent_nestButton')).toEqual(0);
        this.goToNestPage();
        expect(browser.checkElement(this.nestButton, 'MenuComponent_nestButton_Active')).toEqual(0);

        expect(browser.checkElement(this.sensorsButton, 'MenuComponent_sensorsButton')).toEqual(0);
        this.goToSensorsPage();
        expect(browser.checkElement(this.sensorsButton, 'MenuComponent_sensorsButton_Active')).toEqual(0);

        expect(browser.checkElement(this.smartThingsButton, 'MenuComponent_smartThingsButton')).toEqual(0);
        this.goToSmartThingsPage();
        expect(browser.checkElement(this.smartThingsButton, 'MenuComponent_smartThingsButton_Active')).toEqual(0);

        expect(browser.checkElement(this.theaterButton, 'MenuComponent_theaterButton')).toEqual(0);
        this.goToTheaterPage();
        expect(browser.checkElement(this.theaterButton, 'MenuComponent_theaterButton_Active')).toEqual(0);

        expect(browser.checkElement(this.weatherButton, 'MenuComponent_weatherButton')).toEqual(0);
        this.goToWeatherPage();
        expect(browser.checkElement(this.weatherButton, 'MenuComponent_weatherButton_Active')).toEqual(0);
    }
}

module.exports = new MenuComponent();
