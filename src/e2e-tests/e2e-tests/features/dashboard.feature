@navigation
Feature: RoboDomo Dashboard page
    As a User
    I want to see Dashboard page
    So that I can see all Dashboard widgets

    @S1 @automated
    Scenario: Dashboard tabs
        Given User navigates to Dashboard page
        Then User is redirected to Dashboard page
        Then Dashboard tab shall be selected
        When User clicks on Theater tab
        Then Theater tab is loaded
        When User clicks on Bedroom tab
        Then Bedroom tab is loaded
