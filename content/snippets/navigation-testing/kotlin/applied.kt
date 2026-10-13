package snippets.navigation_testing.applied

// #region show
composeTestRule.setContent { AppNavHost(startProfileId = "ada") }
composeTestRule.onNodeWithText("Profile: Ada")
    .assertIsDisplayed()
// #endregion
