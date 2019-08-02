@theater
Feature: RoboDomo Theater page
    As a User
    I want to see Theater page
    So that I can see all Theater widgets

    @automated @smoke
    Scenario Outline: Theater tabs
        Given User navigates to Theater page
        Then User is redirected to Theater page
        Then Theater menu shall be selected
        When User clicks on <tabName> tab on Theater page
        Then Theater <tabName> tab is loaded
        @smoke
        Examples:
            | tabName     |
            | HomeTheater |
