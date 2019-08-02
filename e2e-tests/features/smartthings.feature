@weather
Feature: RoboDomo SmartThings page
    As a User
    I want to press all the switches and check all the sensor states on different tabs of SmartThings page
    So that I can see the app responses to changes properly

    Background:
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        Then SmartThings menu shall be selected


# --- Office tab

    @automated @smoke
    Scenario Outline: Check 'Office Dimmer', 'Office Light' switches on Office tab
        When User clicks on Office tab on SmartThings page
        Then SmartThings Office tab is loaded
        And User changes SmartThings <button> button state to on
        Then >SmartThings <button> button state is on
        When User changes SmartThings <button> button state to off
        Then >SmartThings <button> button state is off
        Examples:
            | button        |
            | Office Dimmer |

    @automated
    Scenario Outline: Check 'Office Dimmer', 'Office Light' switches on Office tab
        When User clicks on Office tab on SmartThings page
        Then SmartThings Office tab is loaded
        And User changes SmartThings <button> button state to on
        Then >SmartThings <button> button state is on
        When User changes SmartThings <button> button state to off
        Then >SmartThings <button> button state is off
        Examples:
            | button       |
            | Office Light |

    @automated
    Scenario: Check 'Entryway Lights' buttons on Office tab
        When User clicks on Office tab on SmartThings page
        Then SmartThings Office tab is loaded
        And User changes SmartThings Entryway Lights button state to off
        Then SmartThings Entryway Lights button state is off
        And User changes SmartThings Entryway Lights button state to off
        Then SmartThings Entryway Lights button state is off


    @automated
    Scenario Outline: Check 'Office Fan' buttons on Office tab
        When User clicks on Office tab on SmartThings page
        Then SmartThings Office tab is loaded
        And User changes SmartThings <button> button state to off
        Then >SmartThings <button> button state is off
        When User changes SmartThings <button> button state to low
        Then >SmartThings <button> button state is low
        When User changes SmartThings <button> button state to medium
        Then >SmartThings <button> button state is medium
        When User changes SmartThings <button> button state to high
        Then >SmartThings <button> button state is high
        Examples:
            | button     |
            | Office Fan |


# --- Back Room tab

    @automated @smoke
    Scenario Outline: Check 'Office Dimmer', 'Office Light' switches on Back Room tab
        When User clicks on Back Room tab on SmartThings page
        Then SmartThings Back Room tab is loaded
        And User changes SmartThings <button> button state to on
        Then >SmartThings <button> button state is on
        When User changes SmartThings <button> button state to off
        Then >SmartThings <button> button state is off
        Examples:
            | button        |
            | Office Dimmer |

    @automated
    Scenario Outline: Check 'Office Dimmer', 'Office Light' switches on Back Room tab
        When User clicks on Back Room tab on SmartThings page
        Then SmartThings Back Room tab is loaded
        And User changes SmartThings <button> button state to on
        Then >SmartThings <button> button state is on
        When User changes SmartThings <button> button state to off
        Then >SmartThings <button> button state is off
        Examples:
            | button       |
            | Office Light |

    @automated
    Scenario: Check 'Entryway Lights' buttons on Back Room tab
        When User clicks on Back Room tab on SmartThings page
        Then SmartThings Back Room tab is loaded
        And User changes SmartThings Entryway Lights button state to off
        Then SmartThings Entryway Lights button state is off
        And User changes SmartThings Entryway Lights button state to off
        Then SmartThings Entryway Lights button state is off


    @automated
    Scenario Outline: Check 'Office Fan' buttons on Back Room tab
        When User clicks on Back Room tab on SmartThings page
        Then SmartThings Back Room tab is loaded
        And User changes SmartThings <button> button state to off
        Then >SmartThings <button> button state is off
        When User changes SmartThings <button> button state to low
        Then >SmartThings <button> button state is low
        When User changes SmartThings <button> button state to medium
        Then >SmartThings <button> button state is medium
        When User changes SmartThings <button> button state to high
        Then >SmartThings <button> button state is high
        Examples:
            | button     |
            | Office Fan |

# --- Bedroom tab

    @automated @smoke
    Scenario Outline: Check 'Kitchen Light', 'Bathroom Light', 'Bedroom Light' switches on Bedroom tab
        When User clicks on Bedroom tab on SmartThings page
        Then SmartThings Bedroom tab is loaded
        And User changes SmartThings <button> button state to on
        Then >SmartThings <button> button state is on
        When User changes SmartThings <button> button state to off
        Then >SmartThings <button> button state is off
        Examples:
            | button        |
            | Kitchen Light |

    @automated
    Scenario Outline: Check 'Kitchen Light', 'Bathroom Light', 'Bedroom Light' switches on Bedroom tab
        When User clicks on Bedroom tab on SmartThings page
        Then SmartThings Bedroom tab is loaded
        And User changes SmartThings <button> button state to on
        Then >SmartThings <button> button state is on
        When User changes SmartThings <button> button state to off
        Then >SmartThings <button> button state is off
        Examples:
            | button         |
            | Bathroom Light |
            | Bedroom Light  |

    @automated
    Scenario Outline: Check 'Entryway Lights', 'Bedroom Lamp' buttons on Bedroom tab
        When User clicks on Bedroom tab on SmartThings page
        Then SmartThings Bedroom tab is loaded
        And User changes SmartThings <button> button state to off
        Then >SmartThings <button> button state is off
        And User changes SmartThings <button> button state to off
        Then >SmartThings <button> button state is off
        Examples:
            | button          |
            | Entryway Lights |
            | Bedroom Lamp    |


    @automated
    Scenario Outline: Check 'Bedroom Fan' buttons on Bedroom tab
        When User clicks on Bedroom tab on SmartThings page
        Then SmartThings Bedroom tab is loaded
        And User changes SmartThings <button> button state to off
        Then >SmartThings <button> button state is off
        When User changes SmartThings <button> button state to low
        Then >SmartThings <button> button state is low
        When User changes SmartThings <button> button state to medium
        Then >SmartThings <button> button state is medium
        When User changes SmartThings <button> button state to high
        Then >SmartThings <button> button state is high
        Examples:
            | button      |
            | Bedroom Fan |


# --- Kitchen tab

    @automated @smoke
    Scenario Outline: Check 'Kitchen Light' switch on Kitchen tab
        When User clicks on Kitchen tab on SmartThings page
        Then SmartThings Kitchen tab is loaded
        And User changes SmartThings <button> button state to on
        Then >SmartThings <button> button state is on
        When User changes SmartThings <button> button state to off
        Then >SmartThings <button> button state is off
        Examples:
            | button        |
            | Kitchen Light |


# --- Bathroom tab

    @automated @smoke
    Scenario Outline: Check 'Bathroom Light' switch on Bathroom tab
        When User clicks on Bathroom tab on SmartThings page
        Then SmartThings Bathroom tab is loaded
        And User changes SmartThings <button> button state to on
        Then >SmartThings <button> button state is on
        When User changes SmartThings <button> button state to off
        Then >SmartThings <button> button state is off
        Examples:
            | button         |
            | Bathroom Light |


# --- Outside tab

    @automated @smoke
    Scenario Outline: Check 'Kitchen Light', 'Bathroom Light', 'Bedroom Light' switches on Outside tab
        When User clicks on Outside tab on SmartThings page
        Then SmartThings Outside tab is loaded
        And User changes SmartThings <button> button state to on
        Then >SmartThings <button> button state is on
        When User changes SmartThings <button> button state to off
        Then >SmartThings <button> button state is off
        Examples:
            | button      |
            | Porch Light |

    @automated
    Scenario Outline: Check 'Kitchen Light', 'Bathroom Light', 'Bedroom Light' switches on Outside tab
        When User clicks on Outside tab on SmartThings page
        Then SmartThings Outside tab is loaded
        And User changes SmartThings <button> button state to on
        Then >SmartThings <button> button state is on
        When User changes SmartThings <button> button state to off
        Then >SmartThings <button> button state is off
        Examples:
            | button         |
            | Outside Light  |
            | Outdoor Lights |
