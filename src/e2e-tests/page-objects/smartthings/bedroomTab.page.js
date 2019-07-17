// bedroomTab.page.js
import Page from '../page';
import MenuComponent from '../menu.component';

class BedroomTabPage extends Page {
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
}

module.exports = new BedroomTabPage('', '/bedroomTab');
