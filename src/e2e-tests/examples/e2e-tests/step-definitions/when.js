import { When } from 'cucumber'
import HomePage from '../page-objects/home.page'

When(/^The user selects the (Account|Password) button$/, { wrapperOptions: { retry: 2 } }, pageElement => {
    switch (pageElement) {
        case 'Account': {
            HomePage.clickAccountButton()
            break
        }
        case 'Password': {
            HomePage.clickPasswordButton()
            break
        }
        default: {
            throw new Error('The element was not found on the homepage.')
        }
    }
})
