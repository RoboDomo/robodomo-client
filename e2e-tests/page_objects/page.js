import MenuComponent from './menu.component';

/** Page selenium page-object-prototype */
export default class Page {
    constructor(title, path) {
        this.title = title;
        this.path = path;
    }

    checkTitle() {
        // TODO would be nice to have the title within the tab
    }

    getMenu() {
        return MenuComponent;
    }

    open() {
        browser.url(this.path);
    }
}
