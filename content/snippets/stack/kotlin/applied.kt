package snippets.stack.applied

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.Alignment
@Composable fun VerificationSnippet() {
// #region show
Box {
    Avatar()
    OnlineBadge(Modifier.align(Alignment.BottomEnd))
}
// #endregion

}
