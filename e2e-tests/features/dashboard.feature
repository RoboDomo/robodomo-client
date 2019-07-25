@dashboard @this
Feature: RoboDomo Dashboard page
    As a User
    I want to see Dashboard page
    So that I can see all Dashboard widgets

    @S1 @automated
    Scenario Outline: Dashboard tabs
        Given User navigates to Dashboard page
        Then User is redirected to Dashboard page
        Then Dashboard menu shall be selected
        When User clicks on <tabName> tab
        Then Dashboard <tabName> tab is loaded
        Examples:
            | tabName |
            | Theater |
            | Bedroom |
