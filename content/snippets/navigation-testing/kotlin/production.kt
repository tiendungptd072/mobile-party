package snippets.navigation_testing.production

import verification.support.*
import androidx.activity.compose.*
import androidx.compose.ui.test.*
fun verificationSnippet() {
// #region show
composeTestRule.setContent { AppNavHost(startProfileId = "missing") }
composeTestRule.onNodeWithText("Profile unavailable")
    .assertIsDisplayed()
// #endregion

}
