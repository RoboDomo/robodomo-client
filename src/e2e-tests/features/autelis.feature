@autelis
Feature: RoboDomo Autelis page


    @S1 @automated
    Scenario Outline: Check Autelis pool/spa/solar options
        Given User loads the RoboDomo web app
        When User clicks Autelis menu button
        Then User is redirected to Autelis page
        Then Autelis tab shall be selected
        When User clicks on Autelis tab
        When User clicks on <offButton> button on Autelis page
        Then All Autelis SPA-POOL parameters should be turned off
        When User clicks on <poolButton> button on Autelis page
        Then Pool parameters are displayed
        When User clicks on <spaButton> button on Autelis page
        Then Spa parameters are displayed
        And Solar parameters are displayed
        Examples:
            | offButton  | poolButton | spaButton  |
            | OFF        | POOL       | SPA        |

    @S1 @automated
    Scenario Outline: Check Solar, Cleaner, Pool Heat, Pool light, Waterfall options 'On' and 'Off'
        Given User loads the RoboDomo web app
        When User clicks Autelis menu button
        Then User is redirected to Autelis page
        Then Autelis tab shall be selected
        When User clicks on Autelis tab
        When User clicks on <solarBtn> button to change state to On on Autelis page
        Then Autelis <solarBtn> button is enabled
        When User clicks on <solarBtn> button to change state to Off on Autelis page
        Then Autelis <solarBtn> button is disabled
        When User clicks on <cleanerButton> button to change state to On on Autelis page
        Then Autelis <cleanerButton> button is enabled
        When User clicks on <cleanerButton> button to change state to Off on Autelis page
        Then Autelis <cleanerButton> button is disabled
        When User clicks on <poolHeatButton> button to change state to On on Autelis page
        Then Autelis <poolHeatButton> button is enabled
        When User clicks on <poolHeatButton> button to change state to Off on Autelis page
        Then Autelis <poolHeatButton> button is disabled
        When User clicks on <poolLightButton> button to change state to On on Autelis page
        Then Autelis <poolLightButton> button is enabled
        When User clicks on <poolLightButton> button to change state to Off on Autelis page
        Then Autelis <poolLightButton> button is disabled
        When User clicks on <waterfallButton> button to change state to On on Autelis page
        Then Autelis <waterfallButton> button is enabled
        When User clicks on <waterfallButton> button to change state to Off on Autelis page
        Then Autelis <waterfallButton> button is disabled
        Examples:
            | solarBtn | cleanerButton | poolHeatButton | poolLightButton | waterfallButton |
            | Solar    | Cleaner       | Pool Heat      | Pool Light      | Waterfall       |


    @S1 @automated
    Scenario Outline: Check Spa Heat, Jets, Spa Light, Blower options 'On' and 'Off'
        Given User loads the RoboDomo web app
        When User clicks Autelis menu button
        Then User is redirected to Autelis page
        Then Autelis tab shall be selected
        When User clicks on Autelis tab
        When User clicks on <spaHeatButton> button to change state to On on Autelis page
        Then Autelis <spaHeatButton> button is enabled
        When User clicks on <spaHeatButton> button to change state to Off on Autelis page
        Then Autelis <spaHeatButton> button is disabled
        When User clicks on <jetsButton> button to change state to On on Autelis page
        Then Autelis <jetsButton> button is enabled
        When User clicks on <jetsButton> button to change state to Off on Autelis page
        Then Autelis <jetsButton> button is disabled
        When User clicks on <spaLightButton> button to change state to On on Autelis page
        Then Autelis <spaLightButton> button is enabled
        When User clicks on <spaLightButton> button to change state to Off on Autelis page
        Then Autelis <spaLightButton> button is disabled
        When User clicks on <blowerButton> button to change state to On on Autelis page
        Then Autelis <blowerButton> button is enabled
        When User clicks on <blowerButton> button to change state to Off on Autelis page
        Then Autelis <blowerButton> button is disabled
        Examples:
            | spaHeatButton | jetsButton | spaLightButton | blowerButton |
            | Spa Heat      | Jets       | Spa Light      | Blower       |

    @S1 @automated
    Scenario: Check Pool/Spa heat adjustments to lower and higher values
        Given User loads the RoboDomo web app
        When User clicks Autelis menu button
        Then User is redirected to Autelis page
        Then Autelis tab shall be selected
        When User clicks on Autelis tab
        When User decreases Pool heat on Autelis page
        Then Pool heat is decreased on Autelis page
        When User increases Pool heat on Autelis page
        Then Pool heat is increased on Autelis page
        When User decreases Spa heat on Autelis page
        Then Spa heat is decreased on Autelis page
        When User increases Spa heat on Autelis page
        Then Spa heat is increased on Autelis page
