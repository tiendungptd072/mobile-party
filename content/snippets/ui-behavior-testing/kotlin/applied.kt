package snippets.ui_behavior_testing.applied

import verification.support.*
import androidx.activity.compose.*
import androidx.compose.ui.test.*
import org.junit.Assert.*
fun verificationSnippet() {
// #region show
var retries = 0
composeTestRule.setContent {
    ProfileScreen(state = ProfileUiState.Error, onRetry = { retries++ })
}
composeTestRule.onNodeWithText("Retry").performClick()
assertEquals(1, retries)
// #endregion

}
