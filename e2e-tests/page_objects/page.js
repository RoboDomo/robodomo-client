/* eslint max-len: ['error', { 'ignoreComments': true, 'ignoreStrings': true, 'ignoreTrailingComments': true }] */
/* eslint lines-between-class-members: ["error", "always", { exceptAfterSingleLine: true }] */
/* eslint class-methods-use-this: [0] */
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
