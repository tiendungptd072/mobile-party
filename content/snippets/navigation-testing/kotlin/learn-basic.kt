package snippets.navigation_testing.learn_basic

// #region show
composeTestRule.setContent { AppNavHost() }
composeTestRule.onNodeWithContentDescription("Open profile")
    .performClick()
composeTestRule.onNodeWithText("Profile: Ada")
    .assertIsDisplayed()
// #endregion
