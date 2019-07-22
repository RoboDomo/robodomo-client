@weather
Feature: RoboDomo SmartThings page
    As a User
    I want to press all the switches and check all the sensor states on different tabs of SmartThings page
    So that I can see the app responses to changes properly

    Background:
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        Then SmartThings tab shall be selected

# --- Theater tab

    @S1 @automated
    Scenario Outline: Check 'Ceiling Fan Light', 'Office Dimmer', 'Office Light', 'Kitchen Light' switches on Theater tab
        When User clicks on Theater tab on SmartThings page
        And User clicks on <button> button to change state to On on SmartThings page
        Then SmartThings <button> button is in On state
        When User clicks on <button> button to change state to Off on SmartThings page
        Then SmartThings <button> button is in Off state
        Examples:
            | button            |
            | Ceiling Fan Light |
            | Office Dimmer     |
            | Office Light      |
            | Kitchen Light     |

    @S1 @automated @this
    Scenario Outline: Check 'Ceiling Fan Light', 'Office Dimmer', 'Office Light', 'Kitchen Light' dimming on Theater tab
        When User clicks on Theater tab on SmartThings page
        And User clicks on <optionName> button to change state to On on SmartThings page
        And MQTT message <optionName> dimmer to value <value> on SmartThings page
        Then SmartThings <optionName> dimmer value is <value> on SmartThings page
        When User clicks Dashboard menu button
        When User clicks on Theater tab
        # TODO uncomment this when state will be persisted locally
        # Then SmartThings <optionName> dimmer value is <value> on Dashboard page
        Examples:
            | optionName        | value |
            | Ceiling Fan Light | 20    |
            | Office Dimmer     | 25    |
            | Office Light      | 30    |
            | Kitchen Light     | 35    |

    @S1 @automated
    Scenario: Check 'Entryway Lights' buttons on Theater tab
        When User clicks on Theater tab on SmartThings page
        And User clicks on Entryway Lights button to change state to Off on SmartThings page
        Then SmartThings Entryway Lights button is in Off state
        And User clicks on Entryway Lights button to change state to Off on SmartThings page
        Then SmartThings Entryway Lights button is in Off state

    @S1 @automated
    Scenario Outline: Check 'Celing Fan', 'Office Fan' buttons on Theater tab
        When User clicks on Theater tab on SmartThings page
        And User clicks on <button> button to change state to Off on SmartThings page
        Then SmartThings <button> button is in Off state
        When User clicks on <button> button to change state to Low on SmartThings page
        Then SmartThings <button> button is in Low state
        When User clicks on <button> button to change state to Medium on SmartThings page
        Then SmartThings <button> button is in Medium state
        When User clicks on <button> button to change state to High on SmartThings page
        Then SmartThings <button> button is in High state
        Examples:
            | button      |
            | Ceiling Fan |
            | Office Fan  |

    @S1 @automated @this
    Scenario Outline: Check 'Entryway Lights', 'Celing Fan', 'Office Fan' dimming on Theater tab
        When User clicks on Theater tab on SmartThings page
        And User clicks on <optionName> button to change state to On on SmartThings page
        And MQTT message <optionName> dimmer to value <value> on SmartThings page
        Then SmartThings <optionName> dimmer value is <value> on SmartThings page
        When User clicks Dashboard menu button
        When User clicks on Theater tab
        # TODO uncomment this when state will be persisted locally
        # Then SmartThings <optionName> dimmer value is <value> on Dashboard page
        Examples:
            | optionName      | state | value |
            | Entryway Lights | on    |       |
            | Entryway Lights | off   |       |
            | Celing Fan      | on    | 33    |
            | Celing Fan      | off   | 67    |
            | Office Fan      | on    | 34    |
            | Office Fan      | off   | 99    |
