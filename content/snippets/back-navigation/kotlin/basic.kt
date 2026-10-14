package snippets.back_navigation.basic

import verification.support.*
import androidx.activity.compose.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
BackHandler(enabled = hasUnsavedChanges) {
    showDiscardDialog = true
}
// #endregion

}
