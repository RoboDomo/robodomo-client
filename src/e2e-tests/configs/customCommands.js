var custom = {
    isButtonEnabled: function () {
        browser.addCommand("isButtonEnabled", function () {
            var self = this;
            browser.waitUntil(function () {
                return self.getAttribute('checked').includes('true');
            }, 5000);
        }, true);
    }(),

    waitForButtonToBeDisplayed: function () {
        browser.addCommand("waitForButtonToBeDisplayed", function () {
            var self = this;
            browser.waitUntil(function () {
                return self.isDisplayed();
            }, 5000);
        }, true);
    }()
};

module.exports = custom;
