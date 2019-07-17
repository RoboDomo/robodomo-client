// dashboard.page.js
import Page from "./page";
import MenuComponent from "./menu.component";

class DashboardPage extends Page {
    get pageContent() {
        return $('//div[contains(@class, "ion-page")]/ion-content[@id="tab-dashboard"]');
    }

    get bedroomTabButton() {
        return $("#dashboard-tabs-tab-bedroom");
    }
    get bedroomTabPane() {
        return $("#dashboard-tabs-tabpane-bedroom");
    }

    get theaterTabButton() {
        return $("#dashboard-tabs-tab-theater");
    }
    get theaterTabPane() {
        return $("#dashboard-tabs-tabpane-theater");
    }

    goToBedroomTab() {
        this.bedroomTabButton.click();
    }

    goToTheaterTab() {
        this.theaterTabButton.click();
    }

    isBedroomTabSelected() {
        browser.waitUntil(() => {
            return this.bedroomTabButton.getAttribute("aria-selected") === "true";
        }, 5000);
        this.bedroomTabPane.isDisplayed();
    }

    isTheaterTabSelected() {
        browser.waitUntil(() => {
            return this.theaterTabButton.getAttribute("aria-selected") === "true";
        }, 5000);
        this.theaterTabPane.isDisplayed();
    }
}

module.exports = new DashboardPage("", "/dashboard");
