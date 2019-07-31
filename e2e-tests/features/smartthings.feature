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

    @S1 @automated
    Scenario Outline: Check 'Office Dimmer', 'Office Light' switches on Office tab
        When User clicks on Office tab on SmartThings page
        And User changes SmartThings <button> button state to On
        Then SmartThings <button> button is in On state
        When User changes SmartThings <button> button state to Off
        Then SmartThings <button> button is in Off state
        Examples:
            | button        |
            | Office Dimmer |
            | Office Light  |

    @S1 @automated
    Scenario: Check 'Entryway Lights' buttons on Office tab
        When User clicks on Office tab on SmartThings page
        And User changes SmartThings Entryway Lights button state to Off
        Then SmartThings Entryway Lights button is in Off state
        And User changes SmartThings Entryway Lights button state to Off
        Then SmartThings Entryway Lights button is in Off state


    @S1 @automated
    Scenario Outline: Check 'Office Fan' buttons on Office tab
        When User clicks on Office tab on SmartThings page
        And User changes SmartThings <button> button state to Off
        Then SmartThings <button> button is in Off state
        When User changes SmartThings <button> button state to Low
        Then SmartThings <button> button is in Low state
        When User changes SmartThings <button> button state to Medium
        Then SmartThings <button> button is in Medium state
        When User changes SmartThings <button> button state to High
        Then SmartThings <button> button is in High state
        Examples:
            | button     |
            | Office Fan |


# --- Back Room tab

    @S1 @automated
    Scenario Outline: Check 'Office Dimmer', 'Office Light' switches on Back Room tab
        When User clicks on Back Room tab on SmartThings page
        And User changes SmartThings <button> button state to On
        Then SmartThings <button> button is in On state
        When User changes SmartThings <button> button state to Off
        Then SmartThings <button> button is in Off state
        Examples:
            | button        |
            | Office Dimmer |
            | Office Light  |

    @S1 @automated
    Scenario: Check 'Entryway Lights' buttons on Back Room tab
        When User clicks on Back Room tab on SmartThings page
        And User changes SmartThings Entryway Lights button state to Off
        Then SmartThings Entryway Lights button is in Off state
        And User changes SmartThings Entryway Lights button state to Off
        Then SmartThings Entryway Lights button is in Off state


    @S1 @automated
    Scenario Outline: Check 'Office Fan' buttons on Back Room tab
        When User clicks on Back Room tab on SmartThings page
        And User changes SmartThings <button> button state to Off
        Then SmartThings <button> button is in Off state
        When User changes SmartThings <button> button state to Low
        Then SmartThings <button> button is in Low state
        When User changes SmartThings <button> button state to Medium
        Then SmartThings <button> button is in Medium state
        When User changes SmartThings <button> button state to High
        Then SmartThings <button> button is in High state
        Examples:
            | button     |
            | Office Fan |

# --- Bedroom tab

    @S1 @automated
    Scenario Outline: Check 'Kitchen Light', 'Bathroom Light', 'Bedroom Light' switches on Bedroom tab
        When User clicks on Bedroom tab on SmartThings page
        And User changes SmartThings <button> button state to On
        Then SmartThings <button> button is in On state
        When User changes SmartThings <button> button state to Off
        Then SmartThings <button> button is in Off state
        Examples:
            | button         |
            | Kitchen Light  |
            | Bathroom Light |
            | Bedroom Light  |

    @S1 @automated
    Scenario Outline: Check 'Entryway Lights', 'Bedroom Lamp' buttons on Bedroom tab
        When User clicks on Bedroom tab on SmartThings page
        And User changes SmartThings <button> button state to Off
        Then SmartThings <button> button is in Off state
        And User changes SmartThings <button> button state to Off
        Then SmartThings <button> button is in Off state
        Examples:
            | button          |
            | Entryway Lights |
            | Bedroom Lamp    |


    @S1 @automated
    Scenario Outline: Check 'Bedroom Fan' buttons on Bedroom tab
        When User clicks on Bedroom tab on SmartThings page
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
            | Bedroom Fan |


# --- Kitchen tab

    @S1 @automated
    Scenario Outline: Check 'Kitchen Light' switch on Kitchen tab
        When User clicks on Kitchen tab on SmartThings page
        And User changes SmartThings <button> button state to On
        Then SmartThings <button> button is in On state
        When User changes SmartThings <button> button state to Off
        Then SmartThings <button> button is in Off state
        Examples:
            | button        |
            | Kitchen Light |


# --- Bathroom tab

    @S1 @automated
    Scenario Outline: Check 'Bathroom Light' switch on Bathroom tab
        When User clicks on Bathroom tab on SmartThings page
        And User changes SmartThings <button> button state to On
        Then SmartThings <button> button is in On state
        When User changes SmartThings <button> button state to Off
        Then SmartThings <button> button is in Off state
        Examples:
            | button         |
            | Bathroom Light |


# --- Outside tab

    @S1 @automated
    Scenario Outline: Check 'Kitchen Light', 'Bathroom Light', 'Bedroom Light' switches on Outside tab
        When User clicks on Outside tab on SmartThings page
        And User changes SmartThings <button> button state to On
        Then SmartThings <button> button is in On state
        When User changes SmartThings <button> button state to Off
        Then SmartThings <button> button is in Off state
        Examples:
            | button         |
            | Porch Light    |
            | Outside Light  |
            | Outdoor Lights |
