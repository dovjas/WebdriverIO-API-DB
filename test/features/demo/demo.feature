Feature: Demo feature

    @demo @smoke
    Scenario Outline: First demo feature
        Given Google page is opened
        When  Search with <SearchItem>
        Then Click on the first search result
        Then URL should match <ExpectedURL>
        
        
        Examples:
            | TestID    | SearchItem  | ExpectedURL         |
            | DEMO_TC01 | WEBDRIVERIO | https://webdriver.io/docs/gettingstarted/ |