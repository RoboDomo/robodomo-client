@weather
Feature: RoboDomo SmartThings page
    As a User
    I want to press all the switches and check all the sensor states on different tabs of SmartThings page
    So that I can see the app responses to changes properly

    Background:
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        Then SmartThings menu shall be selected
        When User clicks on Theater tab on SmartThings page
        Then SmartThings Theater tab is loaded

# --- Theater tab

    @S1 @automated
    Scenario Outline: Check 'Ceiling Fan Light', 'Office Dimmer', 'Office Light', 'Kitchen Light' switches on Theater tab
        And User changes SmartThings <button> button state to On
        Then SmartThings <button> button is in On state
        When User changes SmartThings <button> button state to Off
        Then SmartThings <button> button is in Off state
        Examples:
            | button            |
            | Ceiling Fan Light |
            | Office Dimmer     |
            | Office Light      |
            | Kitchen Light     |

    @S1 @automated
    Scenario Outline: Check 'Ceiling Fan Light', 'Office Dimmer', 'Office Light', 'Kitchen Light' dimming on Theater tab
        And User changes SmartThings <optionName> button state to On
        And MQTT message set <optionName> dimmer to value <value> on SmartThings page
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
        And User changes SmartThings Entryway Lights button state to On
        Then SmartThings Entryway Lights button is in On state
        And User changes SmartThings Entryway Lights button state to Off
        Then SmartThings Entryway Lights button is in Off state

    @S1 @automated
    Scenario Outline: Check 'Celing Fan', 'Office Fan' buttons on Theater tab
        And User changes SmartThings <button> button state to Off
        Then SmartThings <button> button is in Off state
        When User changes SmartThings <button> button state to Low
        Then SmartThings <button> button is in Low state
        When User changes SmartThings <button> button state to Medium
        Then SmartThings <button> button is in Medium state
        When User changes SmartThings <button> button state to High
        Then SmartThings <button> button is in High state
        Examples:
            | button      |
            | Ceiling Fan |
            | Office Fan  |

    @S1
    Scenario Outline: Check 'Celing Fan', 'Entryway Lights', 'Office Fan' dimming on Theater tab
        When MQTT message set <optionName> to <state> and <value> on SmartThings page
        Then SmartThings <optionName> is <state> and <value> on SmartThings page
        When User clicks Dashboard menu button
        When User clicks on Theater tab
        # TODO uncomment this when state will be persisted locally
        # Then SmartThings <optionName> dimmer value is <value> on Dashboard page
        Examples:
            | optionName      | state | value |
            | Entryway Lights | on    | x     |
            | Entryway Lights | off   | x     |
            | Ceiling Fan     | on    | 33    |
            | Ceiling Fan     | off   | 67    |
            | Office Fan      | on    | 34    |
            | Office Fan      | off   | 99    |
