package snippets.navigation_testing.learn_basic

import verification.support.*
import androidx.activity.compose.*
import androidx.compose.ui.test.*
fun verificationSnippet() {
// #region show
composeTestRule.setContent { AppNavHost() }
composeTestRule.onNodeWithContentDescription("Open profile")
    .performClick()
composeTestRule.onNodeWithText("Profile: Ada")
    .assertIsDisplayed()
// #endregion

}
