Feature: Invetory app

    @demo @debug
    Scenario Outline: <TestID>: Demo inventory
        Given As a standard user I login to inventory web app
            | UserType | Username                |
            | StdUser  | standard_user           |
            | ProbUser | problem_user            |
            | PerfUser | performance_glitch_user |
        Then Inventory page should list <NumberOfProducts> products
        Then Validate all products have valid price:price>0
        Examples:
            | TestID   | NumberOfProducts |
            | INV_TC01 | 6 |