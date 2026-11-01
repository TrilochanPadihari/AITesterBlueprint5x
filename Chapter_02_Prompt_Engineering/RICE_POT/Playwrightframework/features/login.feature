Feature: VWO login dashboard

  Background:
    Given the VWO login page is open

  @invalid
  Scenario: Reject invalid login credentials
    When I submit the login form with email "invalid-user@example.com" and password "invalid-password"
    Then an authentication error is displayed

  @valid
  Scenario: Login with valid credentials
    When I submit the login form with configured valid credentials
    Then the VWO dashboard is displayed
