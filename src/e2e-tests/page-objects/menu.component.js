// menu.component.js

import expect from "expect";

class MenuComponent {

    get dashboardButton() {
        return $('//ion-tab-button[@tab="dashboard"]')
    }

    get theaterButton() {
        return $('//ion-tab-button[@tab="theater"]')
    }

    get weatherButton() {
        return $('//ion-tab-button[@tab="weather"]')
    }

    get nestButton() {
        return $('//ion-tab-button[@tab="nest"]')
    }

    get sensorsButton() {
        return $('//ion-tab-button[@tab="sensors"]')
    }

    get autelisButton() {
        return $('//ion-tab-button[@tab="autelis"]')
    }

    get smartThingsButton() {
        return $('//ion-tab-button[@tab="smartthings"]')
    }

    goToAutelisPage() {
        browser.waitUntil(() => {
            return this.autelisButton.isDisplayed();
        }, 5000);
        this.autelisButton.click()
    }

    goToDashboardPage() {
        this.dashboardButton.click()
    }

    goToNestPage() {
        this.nestButton.click()
    }

    goToSensorsPage() {
        this.sensorsButton.click()
    }

    goToSmartThingsPage() {
        this.smartThingsButton.click()
    }

    goToTheaterPage() {
        this.theaterButton.click()
    }

    goToWeatherPage() {
        this.weatherButton.click()
    }

    isAutelisMenuSelected() {
        browser.waitUntil(() => {
            return this.autelisButton.getAttribute('aria-selected') === "true";
        }, 5000);
        expect(this.autelisButton.getAttribute('class')).toContain('tab-selected');
    }

    isDashboardMenuSelected() {
        browser.waitUntil(() => {
            return this.dashboardButton.getAttribute('aria-selected') === "true";
        }, 5000);
        expect(this.dashboardButton.getAttribute('class')).toContain('tab-selected');
    }

    isNestMenuSelected() {
        browser.waitUntil(() => {
            return this.nestButton.getAttribute('aria-selected') === "true";
        }, 5000);
        expect(this.nestButton.getAttribute('class')).toContain('tab-selected');
    }

    isSensorsMenuSelected() {
        browser.waitUntil(() => {
            return this.sensorsButton.getAttribute('aria-selected') === "true";
        }, 5000);
        expect(this.sensorsButton.getAttribute('class')).toContain('tab-selected');
    }

    isSmartThingsMenuSelected() {
        browser.waitUntil(() => {
            return this.smartThingsButton.getAttribute('aria-selected') === "true";
        }, 5000);
        expect(this.smartThingsButton.getAttribute('class')).toContain('tab-selected');
    }

    isTheaterMenuSelected() {
        browser.waitUntil(() => {
            return this.theaterButton.getAttribute('aria-selected') === "true";
        }, 5000);
        expect(this.theaterButton.getAttribute('class')).toContain('tab-selected');
    }

    isWeatherMenuSelected() {
        browser.waitUntil(() => {
            return this.weatherButton.getAttribute('aria-selected') === "true";
        }, 5000);
        expect(this.weatherButton.getAttribute('class')).toContain('tab-selected');
    }
}

module.exports = new MenuComponent();
