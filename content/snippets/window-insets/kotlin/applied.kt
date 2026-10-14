package snippets.window_insets.applied

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
@Composable fun VerificationSnippet() {
// #region show
Column(Modifier.fillMaxSize().imePadding()) {
    MessageList(Modifier.weight(1f))
    TextField(value = draft, onValueChange = onDraftChange)
}
// #endregion

}
