Feature: Export
  Background:
    Given a project with one export saved

  @issue-12 @regression
  Scenario: Export fails politely when the disk is full
    Given a disk with less free space than the export needs
    When the user starts a second export
    Then the export stops with the message "Not enough disk space"
    And no partial file remains
