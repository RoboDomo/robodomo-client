@navigation
Feature: RoboDomo navigation
    As a User
    I want to navigate to the appropriate screen
    So that I can see all my smart home configurations

    @S1 @automated @smoke
    Scenario: RoboDomo default tab
        Given User loads the RoboDomo web app
        Then User is redirected to Dashboard page
        Then Dashboard menu shall be selected

    @S1 @automated @smoke
    Scenario: RoboDomo tab navigation
        Given User loads the RoboDomo web app
        Then User is redirected to Dashboard page
        Then Dashboard menu shall be selected
        When User clicks Theater menu button
        Then User is redirected to Theater page
        Then Theater menu shall be selected
        When User clicks Weather menu button
        Then User is redirected to Weather page
        Then Weather menu shall be selected
        When User clicks Nest menu button
        Then User is redirected to Nest page
        Then Nest menu shall be selected
        When User clicks Sensors menu button
        Then User is redirected to Sensors page
        Then Sensors menu shall be selected
        When User clicks Autelis menu button
        Then User is redirected to Autelis page
        Then Autelis menu shall be selected
        When User clicks SmartThings menu button
        Then User is redirected to SmartThings page
        Then SmartThings menu shall be selected
        When User clicks Dashboard menu button
        Then User is redirected to Dashboard page
        Then Dashboard menu shall be selected
