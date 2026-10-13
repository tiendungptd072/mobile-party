package snippets.ui_behavior_testing.applied

// #region show
var retries = 0
composeTestRule.setContent {
    ProfileScreen(state = ProfileUiState.Error, onRetry = { retries++ })
}
composeTestRule.onNodeWithText("Retry").performClick()
assertThat(retries).isEqualTo(1)
// #endregion
