import { Then } from 'cucumber'
import HomePage from '../page-objects/home.page'
import expect from 'expect'

Then(/^The user should see the (Account button|Password button|How does it work link|App Store link|Google Play link)$/, { wrapperOptions: { retry: 2 } }, pageElement => {
    let element
    switch (pageElement) {
        case 'Account button': {
            element = HomePage.accountButton
            break
        }
        case 'Password button': {
            element = HomePage.passwordButton
            break
        }
        case 'How does it work link': {
            element = HomePage.howDoesItWorkLink
            break
        }
        case 'App Store link': {
            element = HomePage.appStoreLink
            break
        }
        case 'Google Play link': {
            element = HomePage.googlePlayLink
            break
        }
        default: {
            throw new Error('The element does not exist on the home page.')
        }
    }

    expect(element.value).toBeTruthy()
})
