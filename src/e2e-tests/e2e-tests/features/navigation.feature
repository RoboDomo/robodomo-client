@navigation
Feature: RoboDomo navigation
    As a User
    I want to navigate to the appropriate screen
    So that I can see all my smart home configurations

    @S1 @automated
    Scenario: RoboDomo default tab
        Given User loads the RoboDomo web app
        Then User is redirected to Dashboard page
        Then Dashboard tab shall be selected

    @S1 @automated
    Scenario: RoboDomo tab navigation
        Given User loads the RoboDomo web app
        Then User is redirected to Dashboard page
        Then Dashboard tab shall be selected
        When User clicks Theater tab
        Then User is redirected to Theater page
        Then Theater tab shall be selected
        When User clicks Weather tab
        Then User is redirected to Weather page
        Then Weather tab shall be selected
        When User clicks Nest tab
        Then User is redirected to Nest page
        Then Nest tab shall be selected
        When User clicks Sensors tab
        Then User is redirected to Sensors page
        Then Sensors tab shall be selected
        When User clicks Autelis tab
        Then User is redirected to Autelis page
        Then Autelis tab shall be selected
        When User clicks SmartThings tab
        Then User is redirected to SmartThings page
        Then SmartThings tab shall be selected
        When User clicks Dashboard tab
        Then User is redirected to Dashboard page
        Then Dashboard tab shall be selected
