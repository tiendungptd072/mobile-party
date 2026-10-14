package snippets.ui_behavior_testing.basic

import verification.support.*
import androidx.activity.compose.*
import androidx.compose.ui.test.*
fun verificationSnippet() {
// #region show
composeTestRule.setContent { Counter() }
composeTestRule.onNodeWithText("Add").performClick()
composeTestRule.onNodeWithText("Count: 1").assertExists()
// #endregion

}
