@weather
Feature: RoboDomo SmartThings page
    As a User
    I want to press all the switches and check all the sensor states on different tabs of SmartThings page
    So that I can see the app responses to changes properly

# --- Theater tab

    @S1 @automated
    Scenario Outline: Check 'Ceiling Fan Light', 'Office Dimmer', 'Office Light', 'Kitchen Light' switches on Theater tab
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        When User clicks on Theater tab on SmartThings page
        And User clicks on <button> button to change state to On at SmartThings page
        Then SmartThings <button> button is in On state
        When User clicks on <button> button to change state to Off at SmartThings page
        Then SmartThings <button> button is in Off state
        Examples:
            | button            |
            | Ceiling Fan Light |
            | Office Dimmer     |
            | Office Light      |
            | Kitchen Light     |

    @S1 @automated
    Scenario: Check 'Entryway Lights' buttons on Theater tab
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        When User clicks on Theater tab on SmartThings page
        And User clicks on Entryway Lights button to change state to Off at SmartThings page
        Then SmartThings Entryway Lights button is in Off state
        And User clicks on Entryway Lights button to change state to Off at SmartThings page
        Then SmartThings Entryway Lights button is in Off state

    @S1 @automated
    Scenario Outline: Check 'Celing Fan', 'Office Fan' buttons on Theater tab
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        When User clicks on Theater tab on SmartThings page
        And User clicks on <button> button to change state to Off at SmartThings page
        Then SmartThings <button> button is in Off state
        When User clicks on <button> button to change state to Low at SmartThings page
        Then SmartThings <button> button is in Low state
        When User clicks on <button> button to change state to Medium at SmartThings page
        Then SmartThings <button> button is in Medium state
        When User clicks on <button> button to change state to High at SmartThings page
        Then SmartThings <button> button is in High state
        Examples:
            | button            |
            | Ceiling Fan       |
            | Office Fan        |


# --- Office tab

    @S1 @automated
    Scenario Outline: Check 'Office Dimmer', 'Office Light' switches on Office tab
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        When User clicks on Office tab on SmartThings page
        And User clicks on <button> button to change state to On at SmartThings page
        Then SmartThings <button> button is in On state
        When User clicks on <button> button to change state to Off at SmartThings page
        Then SmartThings <button> button is in Off state
        Examples:
            | button            |
            | Office Dimmer     |
            | Office Light      |

    @S1 @automated
    Scenario: Check 'Entryway Lights' buttons on Office tab
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        When User clicks on Office tab on SmartThings page
        And User clicks on Entryway Lights button to change state to Off at SmartThings page
        Then SmartThings Entryway Lights button is in Off state
        And User clicks on Entryway Lights button to change state to Off at SmartThings page
        Then SmartThings Entryway Lights button is in Off state


    @S1 @automated
    Scenario Outline: Check 'Office Fan' buttons on Office tab
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        When User clicks on Office tab on SmartThings page
        And User clicks on <button> button to change state to Off at SmartThings page
        Then SmartThings <button> button is in Off state
        When User clicks on <button> button to change state to Low at SmartThings page
        Then SmartThings <button> button is in Low state
        When User clicks on <button> button to change state to Medium at SmartThings page
        Then SmartThings <button> button is in Medium state
        When User clicks on <button> button to change state to High at SmartThings page
        Then SmartThings <button> button is in High state
        Examples:
            | button            |
            | Office Fan        |


# --- Back Room tab

    @S1 @automated
    Scenario Outline: Check 'Office Dimmer', 'Office Light' switches on Back Room tab
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        When User clicks on Back Room tab on SmartThings page
        And User clicks on <button> button to change state to On at SmartThings page
        Then SmartThings <button> button is in On state
        When User clicks on <button> button to change state to Off at SmartThings page
        Then SmartThings <button> button is in Off state
        Examples:
            | button            |
            | Office Dimmer     |
            | Office Light      |

    @S1 @automated
    Scenario: Check 'Entryway Lights' buttons on Back Room tab
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        When User clicks on Back Room tab on SmartThings page
        And User clicks on Entryway Lights button to change state to Off at SmartThings page
        Then SmartThings Entryway Lights button is in Off state
        And User clicks on Entryway Lights button to change state to Off at SmartThings page
        Then SmartThings Entryway Lights button is in Off state


    @S1 @automated
    Scenario Outline: Check 'Office Fan' buttons on Back Room tab
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        When User clicks on Back Room tab on SmartThings page
        And User clicks on <button> button to change state to Off at SmartThings page
        Then SmartThings <button> button is in Off state
        When User clicks on <button> button to change state to Low at SmartThings page
        Then SmartThings <button> button is in Low state
        When User clicks on <button> button to change state to Medium at SmartThings page
        Then SmartThings <button> button is in Medium state
        When User clicks on <button> button to change state to High at SmartThings page
        Then SmartThings <button> button is in High state
        Examples:
            | button            |
            | Office Fan        |

# --- Bedroom tab

    @S1 @automated
    Scenario Outline: Check 'Kitchen Light', 'Bathroom Light', 'Bedroom Light' switches on Bedroom tab
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        When User clicks on Bedroom tab on SmartThings page
        And User clicks on <button> button to change state to On at SmartThings page
        Then SmartThings <button> button is in On state
        When User clicks on <button> button to change state to Off at SmartThings page
        Then SmartThings <button> button is in Off state
        Examples:
            | button         |
            | Kitchen Light  |
            | Bathroom Light |
            | Bedroom Light  |

    @S1 @automated
    Scenario Outline: Check 'Entryway Lights', 'Bedroom Lamp' buttons on Bedroom tab
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        When User clicks on Bedroom tab on SmartThings page
        And User clicks on <button> button to change state to Off at SmartThings page
        Then SmartThings <button> button is in Off state
        And User clicks on <button> button to change state to Off at SmartThings page
        Then SmartThings <button> button is in Off state
        Examples:
            | button          |
            | Entryway Lights |
            | Bedroom Lamp    |


    @S1 @automated
    Scenario Outline: Check 'Bedroom Fan' buttons on Bedroom tab
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        When User clicks on Bedroom tab on SmartThings page
        And User clicks on <button> button to change state to Off at SmartThings page
        Then SmartThings <button> button is in Off state
        When User clicks on <button> button to change state to Low at SmartThings page
        Then SmartThings <button> button is in Low state
        When User clicks on <button> button to change state to Medium at SmartThings page
        Then SmartThings <button> button is in Medium state
        When User clicks on <button> button to change state to High at SmartThings page
        Then SmartThings <button> button is in High state
        Examples:
            | button      |
            | Bedroom Fan |


# --- Kitchen tab

    @S1 @automated
    Scenario Outline: Check 'Kitchen Light' switch on Kitchen tab
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        When User clicks on Kitchen tab on SmartThings page
        And User clicks on <button> button to change state to On at SmartThings page
        Then SmartThings <button> button is in On state
        When User clicks on <button> button to change state to Off at SmartThings page
        Then SmartThings <button> button is in Off state
        Examples:
            | button         |
            | Kitchen Light  |


# --- Bathroom tab

    @S1 @automated
    Scenario Outline: Check 'Bathroom Light' switch on Bathroom tab
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        When User clicks on Bathroom tab on SmartThings page
        And User clicks on <button> button to change state to On at SmartThings page
        Then SmartThings <button> button is in On state
        When User clicks on <button> button to change state to Off at SmartThings page
        Then SmartThings <button> button is in Off state
        Examples:
            | button         |
            | Bathroom Light  |


# --- Outside tab

    @S1 @automated
    Scenario Outline: Check 'Kitchen Light', 'Bathroom Light', 'Bedroom Light' switches on Outside tab
        Given User navigates to SmartThings page
        Then User is redirected to SmartThings page
        When User clicks on Outside tab on SmartThings page
        And User clicks on <button> button to change state to On at SmartThings page
        Then SmartThings <button> button is in On state
        When User clicks on <button> button to change state to Off at SmartThings page
        Then SmartThings <button> button is in Off state
        Examples:
            | button         |
            | Porch Light  |
            | Outside Light |
            | Outdoor Lights  |
