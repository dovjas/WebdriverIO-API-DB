Feature: Customer search

    @demo @smoke @debug
    Scenario Outline: <TestId> Search external customers
        Given Get list of users from reqres.in
        When An as Admin user login to nopcommerce site
        # Then Verify if all users exist in customers list

        Examples:
        |TestId|
        |E2E_01|