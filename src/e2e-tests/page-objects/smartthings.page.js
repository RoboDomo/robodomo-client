// smartthings.page.js
import Page from './page';
import MenuComponent from './menu.component';

class SmartThingsPage extends Page {
    // navigation
    get pageContent() { return $('//div[contains(@class, "ion-page")]') }
    get theaterTabButton() {return $('//a[text()= "Theater"]')}
    get officeTabButton() { return $('//a[text()= "Office"]') }
    get backRoomTabButton() { return $('//a[text()= "Back Room"]') }
    get bedroomTabButton() { return $('//a[text()= "Bedroom"]') }
    get kitchenTabButton() { return $('//a[text()= "Kitchen"]') }
    get bathroomTabButton() { return $('//a[text()= "Bathroom"]') }
    get outsideTabButton() { return $('//a[text()= "Outside"]') }

    // body
    get ceilingFanLightOnSwitch() {return $('//div[text()="Ceiling Fan Light"]/parent::*//ion-toggle[@checked="true"]')}
    get ceilingFanLightOffSwitch() {return $('//div[text()="Ceiling Fan Light"]/parent::*//ion-toggle[@checked="false"]')}

    get ceilingFanOffButton() {return $('//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Off"]')}
    get ceilingFanLowButton() {return $('//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Low"]')}
    get ceilingFanMediumButton() {return $('//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="Medium"]')}
    get ceilingFanHighButton() {return $('//div[text()="Ceiling Fan"]/parent::*//ion-segment-button[.="High"]')}

    get officeDimmerOnSwitch() {return $('//div[text()="Office Dimmer"]/parent::*//ion-toggle[@checked="true"]')}
    get officeDimmerOffSwitch() {return $('//div[text()="Office Dimmer"]/parent::*//ion-toggle[@checked="false"]')}

    get officeLightOnSwitch() {return $('//div[text()="Office Light"]/parent::*//ion-toggle[@checked="true"]')}
    get officeLightOffSwitch() {return $('//div[text()="Office Light"]/parent::*//ion-toggle[@checked="false"]')}

    get officeFanOffButton() {return $('//div[text()="Office Fan"]/parent::*//ion-segment-button[.="Off"]')}
    get officeFanLowButton() {return $('//div[text()="Office Fan"]/parent::*//ion-segment-button[.="Low"]')}
    get officeFanMediumButton() {return $('//div[text()="Office Fan"]/parent::*//ion-segment-button[.="Medium"]')}
    get officeFanHighButton() {return $('//div[text()="Office Fan"]/parent::*//ion-segment-button[.="High"]')}

    get entrywayLightsOnButton() {return $('//div[text()="Entryway Lights"]/parent::*//ion-segment-button[.="On"]')}
    get entrywayLightsOffButton() {return $('//div[text()="Entryway Lights"]/parent::*//ion-segment-button[.="Off"]')}

    get kitchenLightOnSwitch() {return $('//div[text()="Kitchen Light"]/parent::*//ion-toggle[@checked="true"]')}
    get kitchenLightOffSwitch() {return $('//div[text()="Kitchen Light"]/parent::*//ion-toggle[@checked="false"]')}

    get bathroomLightOnSwitch() {return $('//div[text()="Bathroom Light"]/parent::*//ion-toggle[@checked="true"]')}
    get bathroomLightOffSwitch() {return $('//div[text()="Bathroom Light"]/parent::*//ion-toggle[@checked="false"]')}

    get bedroomLampOnButton() {return $('//div[text()="Bedroom Lamp"]/parent::*//ion-segment-button[.="On"]')}
    get bedroomLampOffButton() {return $('//div[text()="Bedroom Lamp"]/parent::*//ion-segment-button[.="Off"]')}

    get bedroomFanOffButton() {return $('//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="Off"]')}
    get bedroomFanLowButton() {return $('//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="Low"]')}
    get bedroomFanMediumButton() {return $('//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="Medium"]')}
    get bedroomFanHighButton() {return $('//div[text()="Bedroom Fan"]/parent::*//ion-segment-button[.="High"]')}

    get bedroomLightOnSwitch() {return $('//div[text()="Bedroom Light"]/parent::*//ion-toggle[@checked="true"]')}
    get bedroomLightOffSwitch() {return $('//div[text()="Bedroom Light"]/parent::*//ion-toggle[@checked="false"]')}

    get porchLightOnButton() {return $('//div[text()="Porch Light"]/parent::*//ion-segment-button[.="On"]')}
    get porchLightOffButton() {return $('//div[text()="Porch Light"]/parent::*//ion-segment-button[.="Off"]')}

    get outsideLightOnButton() {return $('//div[text()="Outside Light"]/parent::*//ion-segment-button[.="On"]')}
    get outsideLightOffButton() {return $('//div[text()="Outside Light"]/parent::*//ion-segment-button[.="Off"]')}

    get outdoorLightsOnButton() {return $('//div[text()="Outdoor Lights"]/parent::*//ion-segment-button[.="On"]')}
    get outdoorLightsOffButton() {return $('//div[text()="Outdoor Lights"]/parent::*//ion-segment-button[.="Off"]')}

    clickBathroomLightOnSwitch() {
        if (this.isButtonDisplayed(this.bathroomLightOffSwitch)) {
            this.bathroomLightOffSwitch.click();
        }
    }

    clickBathroomLightOffSwitch() {
        if (this.isButtonDisplayed(this.bathroomLightOnSwitch)) {
            this.bathroomLightOnSwitch.click();
        }
    }

    clickBedroomFanOffButton() {
        this.bedroomFanOffButton.click();
    }

    clickBedroomFanLowButton() {
        this.bedroomFanLowButton.click();
    }

    clickBedroomFanMediumButton() {
        this.bedroomFanMediumButton.click();
    }

    clickBedroomFanHighButton() {
        this.bedroomFanHighButton.click();
    }

    clickBedroomLampOnButton() {
        this.bedroomLampOnButton.click();
    }

    clickBedroomLampOffButton() {
        this.bedroomLampOffButton.click();
    }

    clickBedroomLightOnSwitch() {
        if (this.isButtonDisplayed(this.bedroomLightOffSwitch)) {
            this.bedroomLightOffSwitch.click();
        }
    }

    clickBedroomLightOffSwitch() {
        if (this.isButtonDisplayed(this.bedroomLightOnSwitch)) {
            this.bedroomLightOnSwitch.click();
        }
    }

    clickCeilingFanLightOnSwitch() {
        if (this.isButtonDisplayed(this.ceilingFanLightOffSwitch)) {
            this.ceilingFanLightOffSwitch.click();
        }
    }

    clickCeilingFanLightOffSwitch() {
        if (this.isButtonDisplayed(this.ceilingFanLightOnSwitch)) {
            this.ceilingFanLightOnSwitch.click();
        }
    }

    clickCeilingFanOffButton() {
        this.ceilingFanOffButton.click();
    }

    clickCeilingFanLowButton() {
        this.ceilingFanLowButton.click();
    }

    clickCeilingFanMediumButton() {
        this.ceilingFanMediumButton.click();
    }

    clickCeilingFanHighButton() {
        this.ceilingFanHighButton.click();
    }

    clickEntrywayLightsOnButton() {
        this.entrywayLightsOnButton.click();
    }

    clickEntrywayLightsOffButton() {
        this.entrywayLightsOffButton.click();
    }

    clickKitchenLightOnSwitch() {
        if (this.isButtonDisplayed(this.kitchenLightOffSwitch)) {
            this.kitchenLightOffSwitch.click();
        }
    }

    clickKitchenLightOffSwitch() {
        if (this.isButtonDisplayed(this.kitchenLightOnSwitch)) {
            this.kitchenLightOnSwitch.click();
        }
    }

    clickOfficeDimmerOnSwitch() {
        if (this.isButtonDisplayed(this.officeDimmerOffSwitch)) {
            this.officeDimmerOffSwitch.click();
        }
    }

    clickOfficeDimmerOffSwitch() {
        if (this.isButtonDisplayed(this.officeDimmerOnSwitch)) {
            this.officeDimmerOnSwitch.click();
        }
    }

    clickOfficeFanOffButton() {
        this.officeFanOffButton.click();
    }

    clickOfficeFanLowButton() {
        this.officeFanLowButton.click();
    }

    clickOfficeFanMediumButton() {
        this.officeFanMediumButton.click();
    }

    clickOfficeFanHighButton() {
        this.officeFanHighButton.click();
    }

    clickOfficeLightOnSwitch() {
        if (this.isButtonDisplayed(this.officeLightOffSwitch)) {
            this.officeLightOffSwitch.click();
        }
    }

    clickOfficeLightOffSwitch() {
        if (this.isButtonDisplayed(this.officeLightOnSwitch)) {
            this.officeLightOnSwitch.click();
        }
    }

    clickOutdoorLightsOnButton() {
        this.outdoorLightsOnButton.click();
    }

    clickOutdoorLightsOffButton() {
        this.outdoorLightsOffButton.click();
    }

    clickOutsideLightOnButton() {
        this.outsideLightOnButton.click();
    }

    clickOutsideLightOffButton() {
        this.outsideLightOffButton.click();
    }

    clickPorchLightOnButton() {
        this.porchLightOnButton.click();
    }

    clickPorchLightOffButton() {
        this.porchLightOffButton.click();
    }

    isButtonEnabled(button) {
        browser.waitUntil(() => {
            return button.getAttribute('checked').includes('true');
        }, 5000);
    }

    isButtonDisplayed(button) {
        return button.isDisplayed();

    }

    goToTheaterTab() {
        this.theaterTabButton.click();
    }

    goToOfficeTab() {
        this.officeTabButton.click();
    }

    goToBackRoomTab() {
        this.backRoomTabButton.click();
    }

    goToBedroomTab() {
        this.bedroomTabButton.click();
    }

    goToKitchenTab() {
        this.kitchenTabButton.click();
    }

    goToBathroomTab() {
        this.bathroomTabButton.click();
    }

    goToOutsideTab() {
        this.outsideTabButton.click();
    }

    waitForButtonToBeDisplayed(button) {
        browser.waitUntil(() => {
            return button.isDisplayed();
        }, 5000);
    }
}

module.exports = new SmartThingsPage('', '/smartthings');
