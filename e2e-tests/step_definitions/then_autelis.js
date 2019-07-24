import { Then } from 'cucumber';
import AutelisPage from '../page_objects/autelis.page';

Then(
    /^Autelis (Pool parameters are displayed|Spa and Solar parameters are displayed|SPA-POOL parameters turned off) on Autelis page$/,
    parametersStatus => {
        switch (parametersStatus) {
            case 'Pool parameters are displayed':
                AutelisPage.isPoolParameterDisplayed();
                break;
            case 'Spa and Solar parameters are displayed':
                AutelisPage.isSpaAndSolarParameterDisplayed();
                break;
            case 'SPA-POOL parameters turned off':
                AutelisPage.isPoolAndSpaParametersTurnedOff();
                break;
            default:
                break;
        }
    }
);

Then(
    /^Autelis (Blower|Cleaner|Jets|Pool Heat|Pool Light|Solar|Spa Heat|Spa Light|Waterfall) button is (enabled|disabled)$/,
    (buttonName, state) => {
        switch (buttonName) {
            case 'Blower':
                state === 'enabled'
                    ? AutelisPage.blowerOnButton.isButtonEnabled()
                    : AutelisPage.blowerOffButton.isButtonEnabled();
                break;
            case 'Cleaner':
                state === 'enabled'
                    ? AutelisPage.cleanerOnButton.isButtonEnabled()
                    : AutelisPage.cleanerOffButton.isButtonEnabled();
                break;
            case 'Jets':
                state === 'enabled'
                    ? AutelisPage.jetsOnButton.isButtonEnabled()
                    : AutelisPage.jetsOffButton.isButtonEnabled();
                break;
            case 'Pool Heat':
                state === 'enabled'
                    ? AutelisPage.poolHeatOnButton.isButtonEnabled()
                    : AutelisPage.poolHeatOffButton.isButtonEnabled();
                break;
            case 'Pool Light':
                state === 'enabled'
                    ? AutelisPage.poolLightOnButton.isButtonEnabled()
                    : AutelisPage.poolLightOffButton.isButtonEnabled();
                break;
            case 'Solar':
                state === 'enabled'
                    ? AutelisPage.solarOnButton.isButtonEnabled()
                    : AutelisPage.solarOffButton.isButtonEnabled();
                break;
            case 'Spa Heat':
                state === 'enabled'
                    ? AutelisPage.spaHeatOnButton.isButtonEnabled()
                    : AutelisPage.spaHeatOffButton.isButtonEnabled();
                break;
            case 'Spa Light':
                state === 'enabled'
                    ? AutelisPage.spaLightOnButton.isButtonEnabled()
                    : AutelisPage.spaLightOffButton.isButtonEnabled();
                break;
            case 'Waterfall':
                state === 'enabled'
                    ? AutelisPage.waterfallOnButton.isButtonEnabled()
                    : AutelisPage.waterfallOffButton.isButtonEnabled();
                break;
            default:
                break;
        }
    }
);

Then(/^Autelis (Pool|Spa) heat is (increased|decreased)$/, (type, action) => {
    let initialPoolTemperature = browser.scenarioContext.initialPoolTemperature;
    let initialSpaTemperature = browser.scenarioContext.initialSpaTemperature;

    switch (type) {
        case 'Pool':
            AutelisPage.validatePoolTemperatureChange(action, initialPoolTemperature);
            break;
        case 'Spa':
            AutelisPage.validateSpaTemperatureChange(action, initialSpaTemperature);
            break;
        default:
            break;
    }
});
