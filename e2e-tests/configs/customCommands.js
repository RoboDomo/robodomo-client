module.exports = {
    isButtonEnabled: (function() {
        browser.addCommand(
            'isButtonEnabled',
            function() {
                const self = this;
                browser.waitUntil(() => self.getAttribute('checked').includes('true'), 10000);
            },
            true,
        );
    })(),

    waitForButtonToBeDisplayed: (function() {
        browser.addCommand(
            'waitForButtonToBeDisplayed',
            function() {
                const self = this;
                browser.waitUntil(() => self.isDisplayed(), 10000);
            },
            true,
        );
    })(),

    waitForAnimation: (function() {
        browser.addCommand('waitForAnimation', async function() {
            browser.waitUntil(() => {
                return this.getCSSProperty('opacity').value !== 0;
            }, 10000, `Element ${this} did not stop moving`, 250);
        }, true);
    })(),
};
