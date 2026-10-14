package snippets.ui_behavior_testing.production

import verification.support.*
import androidx.activity.compose.*
import androidx.compose.ui.test.*
import kotlinx.coroutines.*
fun verificationSnippet() {
// #region show
val saveResult = CompletableDeferred<Unit>()
composeTestRule.setContent {
    ProfileScreen(onSave = { saveResult.await() })
}
composeTestRule.onNodeWithText("Save").performClick()
composeTestRule.onNodeWithText("Saving…").assertExists()
saveResult.complete(Unit)
composeTestRule.waitUntil(5_000) {
    composeTestRule.onAllNodesWithText("Saved").fetchSemanticsNodes().isNotEmpty()
}
// #endregion

}
