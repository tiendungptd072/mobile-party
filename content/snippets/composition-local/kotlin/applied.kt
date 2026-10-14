package snippets.composition_local.applied

import verification.support.*
import androidx.compose.runtime.*
import androidx.compose.ui.unit.*
@Composable fun VerificationSnippet() {
// #region show
CompositionLocalProvider(LocalSpacing provides 8.dp) {
    Card()
    CompositionLocalProvider(LocalSpacing provides 24.dp) { Card() }
}
// #endregion

}
