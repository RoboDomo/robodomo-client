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


    @S1 @automated @smoke
    Scenario Outline: Check 'Ceiling Fan Light', 'Office Dimmer', 'Office Light', 'Kitchen Light' switches on Theater tab
        And User changes SmartThings <button> button state to On
        Then SmartThings <button> button is in On state
        When User changes SmartThings <button> button state to Off
        Then SmartThings <button> button is in Off state
        Examples:
            | button            |
            | Ceiling Fan Light |

    @S1 @automated
    Scenario Outline: Check 'Ceiling Fan Light', 'Office Dimmer', 'Office Light', 'Kitchen Light' switches on Theater tab
        And User changes SmartThings <button> button state to On
        Then SmartThings <button> button is in On state
        When User changes SmartThings <button> button state to Off
        Then SmartThings <button> button is in Off state
        Examples:
            | button        |
            | Office Dimmer |
            | Office Light  |
            | Kitchen Light |

    @S1 @automated
    Scenario Outline: Check 'Celing Fan', 'Entryway Lights', 'Office Fan' buttons on Theater tab
        And User changes SmartThings <button> button state to <state>
        Then SmartThings <button> button is in <state> state
        Examples:
            | button          | state  |
            | Ceiling Fan     | Off    |
            | Ceiling Fan     | Medium |
            | Office Fan      | Low    |
            | Office Fan      | High   |
            | Entryway Lights | On     |
            | Entryway Lights | Off    |

    @S1
    Scenario Outline: Check 'Celing Fan', 'Entryway Lights', 'Office Fan' dimming on Theater tab
        When MQTT message set <optionName> to <state> and <value> on SmartThings page
        Then SmartThings <optionName> is <state> and <value> on SmartThings page
        When User clicks Dashboard menu button
        When User clicks on Theater tab on Dashboard page
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
