@dashboard
Feature: RoboDomo Visual Regression Dashboard page
    As a User
    I want to take screenshots of all menu elements
    So that I check consistency over time

    Background:
        Given User navigates to Dashboard page
        Then User is redirected to Dashboard page
        Then Dashboard menu shall be selected


    @S1 @automated
    Scenario: Dashboard tabs
        Then Dashboard tab buttons visuals shall match baseline

    @S1 @automated
    Scenario: Dashboard Bedroom tab
        When User clicks on Bedroom tab on Dashboard page
        Then Dashboard Bedroom Nest cell visuals shall match baseline

    @S1 @automated
    Scenario: Dashboard Theater tab
        When User clicks on Theater tab on Dashboard page
        Then Dashboard Theater Nest cell visuals shall match baseline
