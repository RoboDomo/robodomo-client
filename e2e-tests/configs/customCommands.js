module.exports = {
    isButtonEnabled: (function() {
        browser.addCommand(
            'isButtonEnabled',
            function() {
                const self = this;
                browser.waitUntil(() => self.getAttribute('checked').includes('true'), 5000);
            },
            true
        );
    })(),

    waitForButtonToBeDisplayed: (function() {
        browser.addCommand(
            'waitForButtonToBeDisplayed',
            function() {
                const self = this;
                browser.waitUntil(() => self.isDisplayed(), 5000);
            },
            true
        );
    })(),
};
