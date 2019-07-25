module.exports = {
    isButtonEnabled: (function() {
        browser.addCommand(
            'isButtonEnabled',
            function() {
                const self = this;
                browser.waitUntil(() => self.getAttribute('checked').includes('true'), 10000);
            },
            true
        );
    })(),

    waitForButtonToBeDisplayed: (function() {
        browser.addCommand(
            'waitForButtonToBeDisplayed',
            function() {
                const self = this;
                browser.waitUntil(() => self.isDisplayed(), 10000);
            },
            true
        );
    })(),
};
