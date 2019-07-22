@weather
Feature: RoboDomo Weather page
    As a User
    I want to see Weather page
    So that I can see all Weather widgets

    @S1 @automated
    Scenario Outline: Weather tabs
        Given User navigates to Nest page
        Then User is redirected to Nest page
        Then Nest menu shall be selected
        When User clicks on <tabName> tab
        Then <tabName> tab is loaded
        Examples:
            | tabName               |
            | Hallway Thermostat    |
            | Entryway Nest Protect |
