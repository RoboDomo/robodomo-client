@autelis
Feature: RoboDomo Autelis page
    As a User
    I want to press all the switches on Pool/Spa page
    So that I can see the app responses to changes properly

    Background:
        Given User navigates to Autelis page
        Then User is redirected to Autelis page
        Then Autelis menu shall be selected


    # TODO NEEDS FIX
    @S1
    Scenario Outline: Check Autelis pool/spa/solar options
        When User clicks on <button> button on Autelis page
        Then Autelis <parametersDisplay> on Autelis page
        Examples:
            | button | parametersDisplay                      |
            | OFF    | SPA-POOL parameters turned off         |
            | POOL   | Pool parameters are displayed          |
            | SPA    | Spa and Solar parameters are displayed |

    @automated @smoke
    Scenario Outline: Check Solar, Cleaner, Pool Heat, Pool light, Waterfall options 'on' and 'off'
        When User changes Autelis <button> button state to on
        Then Autelis <button> button is enabled
        When User changes Autelis <button> button state to off
        Then Autelis <button> button is disabled
        Examples:
            | button     |
            | Cleaner    |

    @automated
    Scenario Outline: Check Solar, Cleaner, Pool Heat, Pool light, Waterfall options 'on' and 'off'
        When User changes Autelis <button> button state to on
        Then Autelis <button> button is enabled
        When User changes Autelis <button> button state to off
        Then Autelis <button> button is disabled
        Examples:
            | button     |
            | Solar      |
            | Pool Heat  |
            | Pool Light |
            | Waterfall  |
            | Spa Heat   |
            | Jets       |
            | Spa Light  |
            | Blower     |

    @automated @smoke @this
    Scenario Outline: Check Pool/Spa heat adjustments to lower and higher values
        When User decreases Autelis <sensor> heat
        Then Autelis <sensor> heat is decreased
        When User increases Autelis <sensor> heat
        Then Autelis <sensor> heat is increased
        Examples:
            | sensor |
            | Pool   |
            | Spa    |
