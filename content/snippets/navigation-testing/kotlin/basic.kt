package snippets.navigation_testing.basic

// #region show
@Test fun opensAdaProfile() {
    composeTestRule.setContent { AppNavHost() }

    composeTestRule.onNodeWithContentDescription("Open profile")
        .performClick()

    composeTestRule.onNodeWithText("Profile: Ada")
        .assertIsDisplayed()
}
// #endregion
