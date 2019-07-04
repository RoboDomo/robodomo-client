// home.page.js
import Page from './page';

class HomePage extends Page {

    get accountButton() { return $('//div[text()=\'Account\']') }
    get appStoreLink() { return $('//a[contains(@href,\'/beepios\')]') }
    get googlePlayLink() { return $('//a[contains(@href,\'/beepandroid\')]') }
    get howDoesItWorkLink() { return $('//span[text()=\'How does it work?\']') }
    get logo() { return $('//img[contains(@src,\'Beep-Logo\')]') }
    get passwordButton() { return $('//div[text()=\'Password\']') }

    open() {
        super.open('/')
    }

    clickAccountButton() {
        this.accountButton.click()
    }

    clickPasswordButton() {
        this.passwordButton.click()
    }

}

export default new HomePage()
