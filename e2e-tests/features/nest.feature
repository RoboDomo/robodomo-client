@weather
Feature: RoboDomo Nest page
    As a User
    I want to see Weather page
    So that I can see all nest widgets

    @S1 @automated @smoke
    Scenario Outline: Nest tabs
        Given User navigates to Nest page
        Then User is redirected to Nest page
        Then Nest menu shall be selected
        When User clicks on <tabName> tab on Nest page
        Then Nest <tabName> tab is loaded
        Examples:
            | tabName               |
            | Hallway Thermostat    |
            | Entryway Nest Protect |
