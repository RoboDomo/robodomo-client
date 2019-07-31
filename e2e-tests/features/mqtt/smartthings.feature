@weather @mqtt
Feature: RoboDomo MQTT SmartThings page
    As a User
    I want to press all the switches and check all the sensor states on different tabs of SmartThings page
    So that I can see the app responses to changes properly

    Background:
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        Then SmartThings menu shall be selected
        When User clicks on Theater tab on SmartThings page
        Then SmartThings Theater tab is loaded

    @S1 @automated
    Scenario Outline: Check 'Ceiling Fan Light', 'Office Dimmer', 'Office Light', 'Kitchen Light' dimming on Theater tab
        And MQTT message set <optionName> dimmer to state <state> on SmartThings page
        And MQTT message set <optionName> dimmer to value <value> on SmartThings page
        Then SmartThings <optionName> dimmer value is <value> on SmartThings page
        When User clicks Dashboard menu button
        When User clicks on Theater tab on Dashboard page
        Then SmartThings <optionName> dimmer value is <value> on Dashboard page
        Examples:
            | optionName        | state | value |
            | Ceiling Fan Light | on    | 20    |
            | Office Dimmer     | on    | 25    |
            | Office Light      | on    | 30    |
            | Kitchen Light     | on    | 35    |
