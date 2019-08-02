@weather
Feature: RoboDomo Weather page
    As a User
    I want to see Weather page
    So that I can see all Weather widgets

    @S1
    Scenario Outline: Nest tabs
        Given User navigates to Weather page
        Then User is redirected to Weather page
        Then Weather menu shall be selected
        When User clicks on <tabName> tab on Weather page
        Then Weather <tabName> tab is loaded

        Examples:
            | tabName       |
            | San Diego, CA |
            | New York, NY  |
