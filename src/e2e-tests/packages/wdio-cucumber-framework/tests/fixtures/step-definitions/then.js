var assert = require('assert')
import { Then } from 'cucumber'

Then('the title of the page should be {string}', (expectedTitle) => {
    const actualTitle = browser.getTitle()
    assert.equal(actualTitle, expectedTitle)
})
