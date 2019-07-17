// officeTab.page.js
import Page from '../page';
import MenuComponent from '../menu.component';

class OfficeTabPage extends Page {
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

    clickEntrywayLightsOnButton() {
        this.entrywayLightsOnButton.click();
    }

    clickEntrywayLightsOffButton() {
        this.entrywayLightsOffButton.click();
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
}

module.exports = new OfficeTabPage('', '/officeTab');
