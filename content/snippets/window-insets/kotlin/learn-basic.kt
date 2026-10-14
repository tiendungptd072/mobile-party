package snippets.window_insets.learn_basic

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
@Composable fun VerificationSnippet() {
// #region show
Box(Modifier.fillMaxWidth().safeDrawingPadding()) {
    HeaderActions()
}
// #endregion

}
