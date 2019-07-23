import { When } from 'cucumber';
import AutelisPage from '../page_objects/autelis.page';

When(
    /^User changes Autelis (Solar|Cleaner|Pool Heat|Pool Light|Waterfall|Spa Heat|Jets|Spa Light|Blower) button state to (On|Off)$/,
    (buttonName, state) => {
        switch (buttonName) {
            case 'Blower':
                AutelisPage.toggleBlower(state);
                break;
            case 'Cleaner':
                AutelisPage.toggleCleaner(state);
                break;
            case 'Jets':
                AutelisPage.toggleJets(state);
                break;
            case 'Pool Heat':
                AutelisPage.togglePoolHeat(state);
                break;
            case 'Pool Light':
                AutelisPage.togglePoolLight(state);
                break;
            case 'Solar':
                AutelisPage.toggleSolar(state);
                break;
            case 'Spa Heat':
                AutelisPage.toggleSpaHeat(state);
                break;
            case 'Spa Light':
                AutelisPage.toggleSpaLight(state);
                break;
            case 'Waterfall':
                AutelisPage.toggleWaterfall(state);
                break;
            default:
                break;
        }
    }
);

When(/^User clicks on (OFF|POOL|SPA) button on Autelis page$/, buttonName => {
    switch (buttonName) {
        case 'OFF':
            AutelisPage.clickOffButton();
            break;
        case 'POOL':
            AutelisPage.clickPoolButton();
            break;
        case 'SPA':
            AutelisPage.clickSpaButton();
            break;
        default:
            break;
    }
});

When(/^User (decreases|increases) Autelis (Pool|Spa) heat$/, (action, type) => {
    switch (type) {
        case 'Pool':
            browser.scenarioContext['initialPoolTemperature'] = AutelisPage.adjustPoolHeat(action);
            break;
        case 'Spa':
            browser.scenarioContext['initialPoolTemperature'] = AutelisPage.adjustSpaHeat(action);
            break;
        default:
            break;
    }
});
