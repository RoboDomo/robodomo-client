@mqtt
Feature: RoboDomo MQTT Dashboard page
    As a User
    I want to press all the switches and check all the sensor states on different tabs of Dashboard page
    So that I can see the app responses to changes properly

    Background:
        Given User navigates to Dashboard page
        Then User is redirected to Dashboard page
        Then Dashboard menu shall be selected


    @automated
    Scenario Outline: Check card options
        And MQTT message set <optionName> to state <state> and value <value>
        When User clicks on Theater tab on Dashboard page
        Then Dashboard Theater tab is loaded
        Then Dashboard <optionName> card value is <mode>
        Examples:
            | optionName  | state | value | mode |
            | Ceiling Fan | on    | 33    | low  |

    @automated
    Scenario Outline: Check card options
        And MQTT message set <optionName> to state <state> and value <value>
        When User clicks on Theater tab on Dashboard page
        Then Dashboard Theater tab is loaded
        Then Dashboard <optionName> card value is <value>
        Examples:
            | optionName        | state | value |
            | Ceiling Fan Light | on    | 20    |

    @automated
    Scenario Outline: Check card options
        And MQTT message set <optionName> to state <state> and value <value>
        When User clicks on Theater tab on Dashboard page
        Then Dashboard Theater tab is loaded
        Then Dashboard <optionName> card value is <value>
        Examples:
            | optionName    | state | value |
            | Kitchen Light | on    | 35    |

    @automated
    Scenario Outline: Check card options
        And MQTT message set <optionName> to state <state> and value <value>
        When User clicks on Bedroom tab on Dashboard page
        Then Dashboard Bedroom tab is loaded
        Then Dashboard <optionName> card value is <value>
        Examples:
            | optionName     | state | value |
            | Bathroom Light | on    | 80    |

    @automated
    Scenario Outline: Check card options
        And MQTT message set <optionName> to state <state> and value <value>
        When User clicks on Bedroom tab on Dashboard page
        Then Dashboard Bedroom tab is loaded
        Then Dashboard <optionName> card value is <value>
        Examples:
            | optionName    | state | value |
            | Bedroom Light | on    | 30    |

    @automated
    Scenario Outline: Check card options
        And MQTT message set <optionName> to state <state> and value <value>
        When User clicks on Bedroom tab on Dashboard page
        Then Dashboard Bedroom tab is loaded
        Then Dashboard <optionName> card value is <mode>
        Examples:
            | optionName   | state | value | mode |
            | Bedroom Fan  | on    | 67    | high |
            | Bedroom Lamp | on    | 0     | on   |
