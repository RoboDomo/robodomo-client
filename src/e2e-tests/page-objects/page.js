import MenuComponent from "./menu.component";

export default class Page {
    constructor(title, path) {
        this.title = title;
        this.path = path;
    }

    checkTitle() {
        //TODO would be nice to have the title within the tab
    }

    getMenu() { return MenuComponent}

    open() {
        browser.url(this.path);
    }

    isButtonDisplayed(button) {
        return button.isDisplayed();
    }

    isButtonEnabled(button) {
        browser.waitUntil(() => {
            return button.getAttribute('checked').includes('true');
        }, 5000);
    }

    waitForButtonToBeDisplayed(button) {
        browser.waitUntil(() => {
            return button.isDisplayed();
        }, 5000);
    }
}
