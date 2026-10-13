package snippets.navigation_testing.production

// #region show
composeTestRule.setContent { AppNavHost(startProfileId = "missing") }
composeTestRule.onNodeWithText("Profile unavailable")
    .assertIsDisplayed()
// #endregion
