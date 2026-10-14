package snippets.navigation_testing.applied

import verification.support.*
import androidx.activity.compose.*
import androidx.compose.ui.test.*
fun verificationSnippet() {
// #region show
composeTestRule.setContent { AppNavHost(startProfileId = "ada") }
composeTestRule.onNodeWithText("Profile: Ada")
    .assertIsDisplayed()
// #endregion

}
