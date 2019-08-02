@mqtt
Feature: RoboDomo MQTT SmartThings page
    As a User
    I want to press all the switches and check all the sensor states on different tabs of SmartThings page
    So that I can see the app responses to changes properly

    Background:
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        Then SmartThings menu shall be selected

    @automated
    Scenario Outline: Check Bathroom dimming options
        And MQTT message set <optionName> to state <state> and value <value>
        When User clicks on All tab on SmartThings page
        Then SmartThings All tab is loaded
        Then SmartThings <optionName> button state is <state>
        Then SmartThings <optionName> dimmer value is <value>
        When User clicks on Bedroom tab on SmartThings page
        Then SmartThings <optionName> button state is <state>
        Then SmartThings <optionName> dimmer value is <value>
        When User clicks on Bathroom tab on SmartThings page
        Then SmartThings <optionName> button state is <state>
        Then SmartThings <optionName> dimmer value is <value>
        Examples:
            | optionName     | state | value |
            | Bathroom Light | on    | 80    |

    @automated
    Scenario Outline: Check Bedroom dimming options
        And MQTT message set <optionName> to state <state> and value <value>
        When User clicks on All tab on SmartThings page
        Then SmartThings All tab is loaded
        Then SmartThings <optionName> button state is <state>
        Then SmartThings <optionName> dimmer value is <value>
        When User clicks on Bedroom tab on SmartThings page
        Then SmartThings <optionName> button state is <state>
        Then SmartThings <optionName> dimmer value is <value>
        Examples:
            | optionName    | state | value |
            | Bedroom Light | on    | 30    |

    @automated
    Scenario Outline: Check Kitchen dimming options
        And MQTT message set <optionName> to state <state> and value <value>
        When User clicks on All tab on SmartThings page
        Then SmartThings All tab is loaded
        Then SmartThings <optionName> button state is <state>
        Then SmartThings <optionName> dimmer value is <value>
        When User clicks on Theater tab on SmartThings page
        Then SmartThings <optionName> button state is <state>
        Then SmartThings <optionName> dimmer value is <value>
        When User clicks on Kitchen tab on SmartThings page
        Then SmartThings <optionName> button state is <state>
        Then SmartThings <optionName> dimmer value is <value>
        Examples:
            | optionName    | state | value |
            | Kitchen Light | on    | 35    |

    @automated
    Scenario Outline: Check Office dimming options
        And MQTT message set <optionName> to state <state> and value <value>
        When User clicks on All tab on SmartThings page
        Then SmartThings All tab is loaded
        Then SmartThings <optionName> button state is <state>
        Then SmartThings <optionName> dimmer value is <value>
        When User clicks on Theater tab on SmartThings page
        Then SmartThings <optionName> button state is <state>
        Then SmartThings <optionName> dimmer value is <value>
        When User clicks on Office tab on SmartThings page
        Then SmartThings <optionName> button state is <state>
        Then SmartThings <optionName> dimmer value is <value>
        Examples:
            | optionName    | state | value |
            | Office Dimmer | on    | 25    |
            | Office Light  | on    | 30    |

    @automated
    Scenario Outline: Check Theater dimming options
        And MQTT message set <optionName> to state <state> and value <value>
        When User clicks on All tab on SmartThings page
        Then SmartThings All tab is loaded
        Then SmartThings <optionName> button state is <state>
        Then SmartThings <optionName> dimmer value is <value>
        When User clicks on Theater tab on SmartThings page
        Then SmartThings <optionName> button state is <state>
        Then SmartThings <optionName> dimmer value is <value>
        Examples:
            | optionName        | state | value |
            | Ceiling Fan Light | on    | 20    |


    @automated
    Scenario Outline: Check Bedroom switch options
        And MQTT message set <optionName> to state <state> and value <value>
        When User clicks on All tab on SmartThings page
        Then SmartThings All tab is loaded
        Then SmartThings <optionName> button state is <mode>
        When User clicks on Bedroom tab on SmartThings page
        Then SmartThings <optionName> button state is <mode>
        Examples:
            | optionName   | state | value | mode |
            | Bedroom Fan  | on    | 67    | high |
            | Bedroom Lamp | on    | 0     | on   |


    @automated
    Scenario Outline: Check Entryway switch options
        And MQTT message set <optionName> to state <state> and value <value>
        When User clicks on All tab on SmartThings page
        Then SmartThings All tab is loaded
        Then SmartThings <optionName> button state is <mode>
        When User clicks on Theater tab on SmartThings page
        Then SmartThings <optionName> button state is <mode>
        When User clicks on Office tab on SmartThings page
        Then SmartThings <optionName> button state is <mode>
        Examples:
            | optionName      | state | value | mode |
            | Entryway Lights | on    | 0     | on   |


    @automated
    Scenario Outline: Check Office switch options
        And MQTT message set <optionName> to state <state> and value <value>
        When User clicks on All tab on SmartThings page
        Then SmartThings All tab is loaded
        Then SmartThings <optionName> button state is <mode>
        When User clicks on Theater tab on SmartThings page
        Then SmartThings <optionName> button state is <mode>
        When User clicks on Office tab on SmartThings page
        Then SmartThings <optionName> button state is <mode>
        Examples:
            | optionName  | state | value | mode   |
            | Office Fan  | on    | 34    | medium |

    @automated
    Scenario Outline: Check Outside switch options
        And MQTT message set <optionName> to state <state> and value <value>
        When User clicks on All tab on SmartThings page
        Then SmartThings All tab is loaded
        Then SmartThings <optionName> button state is <mode>
        When User clicks on Outside tab on SmartThings page
        Then SmartThings <optionName> button state is <mode>
        Examples:
            | optionName     | state | value | mode |
            | Outdoor Lights | on    | 0     | on   |
            | Outside Light  | on    | 0     | on   |
            | Porch Light    | on    | 0     | on   |


    @automated
    Scenario Outline: Check Theater switch options
        And MQTT message set <optionName> to state <state> and value <value>
        When User clicks on All tab on SmartThings page
        Then SmartThings All tab is loaded
        Then SmartThings <optionName> button state is <mode>
        When User clicks on Theater tab on SmartThings page
        Then SmartThings <optionName> button state is <mode>
        Examples:
            | optionName  | state | value | mode   |
            | Ceiling Fan | on    | 33    | low    |
