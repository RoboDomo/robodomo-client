@dashboard
Feature: RoboDomo Dashboard page
    As a User
    I want to see Dashboard page
    So that I can see and use all Dashboard widgets

    Background:
        Given User navigates to Dashboard page
        Then User is redirected to Dashboard page
        Then Dashboard menu shall be selected

    @S1 @automated @smoke
    Scenario Outline: Dashboard tabs
        When User clicks on <tabName> tab on Dashboard page
        Then Dashboard <tabName> tab is loaded
        Examples:
            | tabName |
            | Theater |
            | Bedroom |

    @S1
    Scenario: Check Time tile at Theater tab
        When User clicks on Theater tab on Dashboard page
        Then Dashboard Theater tab is loaded
        Then Current date is displayed at Theater/Bedroom tab of Dashboard page
        And  Current time is displayed at Theater/Bedroom tab of Dashboard page
        And Sunrise is displayed at Theater/Bedroom tab of Dashboard page
        And Sunset is displayed at Theater/Bedroom tab of Dashboard page

    @S1
    Scenario Outline: Check Location and Wind tile at Theater tab
        When User clicks on Theater tab on Dashboard page
        Then Dashboard Theater tab is loaded
        Then <city> is displayed at Theater/Bedroom tab of Dashboard page
        And Temperature is displayed at Theater/Bedroom tab of Dashboard page
        And Wind direction is displayed at Theater/Bedroom tab of Dashboard page
        Examples:
            | city      |
            | San Diego |

    @S1
    Scenario: Check Temperature tile and its counter at Theater tab
        When User clicks on Theater tab on Dashboard page
        Then Dashboard Theater tab is loaded
        Then Inside temp parameter is displayed at Theater/Bedroom tab of Dashboard page
        When User decreases heat at Theater/Bedroom tab of Dashboard page
        Then Heat is decreased at Theater/Bedroom tab of Dashboard page
        When User increases heat at Theater/Bedroom tab of Dashboard page
        Then Heat is increased at Theater/Bedroom tab of Dashboard page


    @S1
    Scenario: Check Pool tile at Theater tab
        When User clicks on Theater tab on Dashboard page
        Then Dashboard Theater tab is loaded
        Then Pool temp is displayed at Theater tab of Dashboard page
        And Filter is displayed at Theater tab of Dashboard page
        And Waterfall is displayed at Theater tab of Dashboard page
        And Pool Heat is displayed at Theater tab of Dashboard page
        And Solar Heat is displayed at Theater tab of Dashboard page

    @S1
    Scenario: Check Spa, Jets and Light tile at Theater tab
        When User clicks on Theater tab on Dashboard page
        Then Dashboard Theater tab is loaded
        Then Spa is displayed at Theater tab of Dashboard page
        Then Jets is displayed at Theater tab of Dashboard page
        And Light is displayed at Theater tab of Dashboard page


    @S1
    Scenario Outline: Check Ceiling Fan, Ceiling Fan Light, Kitchen Light buttons at Theater tab
        When User clicks on Theater tab on Dashboard page
        Then Dashboard Theater tab is loaded
        When User clicks on <button> at Theater tab of Dashboard page
        Then <button> state is changed accordingly (from Off to On or from Off to Low...)
        Examples:
            | button            |
            | Ceiling Fan       |
            | Ceiling Fan       |
            | Ceiling Fan       |
            | Ceiling Fan       |
            | Ceiling Fan Light |
            | Kitchen Light     |


    @S1
    Scenario: Check Time tile at Bedroom tab
        When User clicks on Bedroom tab on Dashboard page
        Then Dashboard Bedroom tab is loaded
        Then Current date is displayed at Theater/Bedroom tab of Dashboard page
        And  Current time is displayed at Theater/Bedroom tab of Dashboard page
        And Sunrise is displayed at Theater/Bedroom tab of Dashboard page
        And Sunset is displayed at Theater/Bedroom tab of Dashboard page

    @S1
    Scenario Outline: Check Location and Wind tile at Bedroom tab
        When User clicks on Bedroom tab on Dashboard page
        Then Dashboard Bedroom tab is loaded
        Then <city> is displayed at Theater/Bedroom tab of Dashboard page
        And Temperature is displayed at Theater/Bedroom tab of Dashboard page
        And Wind direction is displayed at Theater/Bedroom tab of Dashboard page
        Examples:
            | city      |
            | San Diego |


    @S1
    Scenario: Check Temperature tile and its counter at Bedroom tab
        When User clicks on Bedroom tab on Dashboard page
        Then Dashboard Bedroom tab is loaded
        Then Inside temp parameter is displayed at Theater tab of Dashboard page
        When User decreases heat at Theater/Bedroom tab of Dashboard page
        Then Heat is decreased at Theater/Bedroom tab of Dashboard page
        When User increases heat at Theater/Bedroom tab of Dashboard page
        Then Heat is increased at Theater/Bedroom tab of Dashboard page

    @S1
    Scenario: Check Spa tile at Bedroom tab
        When User clicks on Bedroom tab on Dashboard page
        Then Dashboard Bedroom tab is loaded
        Then Spa temp is displayed at Bedroom tab of Dashboard page
        And Heat is displayed at Bedroom tab of Dashboard page
        And Blower is displayed at Bedroom tab of Dashboard page

    @S1
    Scenario Outline: Check Bedroom Fan, Bedroom Lamp, Bedroom Light, Bathroom Light buttons at Bedroom ta
        When User clicks on Bedroom tab on Dashboard page
        Then Dashboard Bedroom tab is loaded
        When User clicks on <button> at Bedroom tab of Dashboard page
        Then <button> state is changed accordingly (from Off to On or from Off to Low...)
        Examples:
            | button         |
            | Bedroom Fan    |
            | Bedroom Fan    |
            | Bedroom Fan    |
            | Bedroom Fan    |
            | Bedroom Lamp   |
            | Bedroom Light  |
            | Bathroom Light |
