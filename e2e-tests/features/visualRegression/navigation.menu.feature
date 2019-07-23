@navigation
Feature: RoboDomo Visual Regression navigation menu
    As a User
    I want to take screenshots of all menu elements
    So that I check consistency over time

    @S1 @automated
    Scenario: RoboDomo tab navigation
        Given User loads the RoboDomo web app
        Then User is redirected to Dashboard page
        Then Dashboard tab shall be selected
        Then Menu elements visuals shall match baseline
