module.exports = {
    isButtonEnabled: (function() {
        browser.addCommand(
            'isButtonEnabled',
            function() {
                browser.waitUntil(() => this.getAttribute('checked') === 'true',
                    10000);
            },
            true,
        );
    })(),

    waitForButtonToBeDisplayed: (function() {
        browser.addCommand(
            'waitForButtonToBeDisplayed',
            function() {
                browser.waitUntil(() => this.isDisplayed(),
                    10000);
            },
            true,
        );
    })(),

    waitForAnimation: (function() {
        browser.addCommand(
            'waitForAnimation',
            function() {
                browser.waitUntil(() => {
                    let opacityValue = this.getCSSProperty('opacity').value;
                    return opacityValue === 1;
                }, 10000, `Element ${this} did not stop moving`, 100);
                browser.pause(250);
            }, true);
    })(),
};
