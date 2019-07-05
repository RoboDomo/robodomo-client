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

    clickAutelisButton() {
        this.autelisButton.click()
    }

    clickDashboardButton() {
        this.dashboardButton.click()
    }

    clickNestButton() {
        this.nestButton.click()
    }

    clickSensorsButton() {
        this.sensorsButton.click()
    }

    clickSmartThingsButton() {
        this.smartThingsButton.click()
    }

    clickTheaterButton() {
        this.theaterButton.click()
    }

    clickWeatherButton() {
        this.weatherButton.click()
    }

    isAutelisTabSelected() {
        expect(this.autelisButton.getAttribute('aria-selected')).toStrictEqual('true');
        expect(this.autelisButton.getAttribute('class')).toContain('tab-selected');
    }

    isDashboardTabSelected() {
        expect(this.dashboardButton.getAttribute('aria-selected')).toStrictEqual('true');
        expect(this.dashboardButton.getAttribute('class')).toContain('tab-selected');
    }

    isNestTabSelected() {
        expect(this.nestButton.getAttribute('aria-selected')).toStrictEqual('true');
        expect(this.nestButton.getAttribute('class')).toContain('tab-selected');
    }

    isSensorsTabSelected() {
        expect(this.sensorsButton.getAttribute('aria-selected')).toStrictEqual('true');
        expect(this.sensorsButton.getAttribute('class')).toContain('tab-selected');
    }

    isSmartThingsTabSelected() {
        expect(this.smartThingsButton.getAttribute('aria-selected')).toStrictEqual('true');
        expect(this.smartThingsButton.getAttribute('class')).toContain('tab-selected');
    }

    isTheaterTabSelected() {
        expect(this.theaterButton.getAttribute('aria-selected')).toStrictEqual('true');
        expect(this.theaterButton.getAttribute('class')).toContain('tab-selected');
    }

    isWeatherTabSelected() {
        expect(this.weatherButton.getAttribute('aria-selected')).toStrictEqual('true');
        expect(this.weatherButton.getAttribute('class')).toContain('tab-selected');
    }
}

module.exports = new MenuComponent();
