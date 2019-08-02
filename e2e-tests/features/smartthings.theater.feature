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


    @automated @smoke
    Scenario Outline: Check 'Ceiling Fan Light', 'Office Dimmer', 'Office Light', 'Kitchen Light' switches on Theater tab
        And User changes SmartThings <button> button state to on
        Then >SmartThings <button> button state is on
        When User changes SmartThings <button> button state to off
        Then >SmartThings <button> button state is off
        Examples:
            | button            |
            | Ceiling Fan Light |

    @automated
    Scenario Outline: Check 'Ceiling Fan Light', 'Office Dimmer', 'Office Light', 'Kitchen Light' switches on Theater tab
        And User changes SmartThings <button> button state to on
        Then >SmartThings <button> button state is on
        When User changes SmartThings <button> button state to off
        Then >SmartThings <button> button state is off
        Examples:
            | button        |
            | Office Dimmer |
            | Office Light  |
            | Kitchen Light |

    @automated
    Scenario Outline: Check 'Celing Fan', 'Entryway Lights', 'Office Fan' buttons on Theater tab
        And User changes SmartThings <button> button state to <state>
        Then SmartThings <button> button state is <state>
        Examples:
            | button          | state  |
            | Ceiling Fan     | off    |
            | Ceiling Fan     | medium |
            | Office Fan      | low    |
            | Office Fan      | high   |
            | Entryway Lights | on     |
            | Entryway Lights | off    |

    @S1
    Scenario Outline: Check 'Celing Fan', 'Entryway Lights', 'Office Fan' dimming on Theater tab
        When MQTT message set <optionName> to <state> and <value>
        Then SmartThings <optionName> is <state> and <value>
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
