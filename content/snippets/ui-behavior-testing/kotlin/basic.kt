package snippets.ui_behavior_testing.basic

// #region show
composeTestRule.setContent { Counter() }
composeTestRule.onNodeWithText("Add").performClick()
composeTestRule.onNodeWithText("Count: 1").assertExists()
// #endregion
