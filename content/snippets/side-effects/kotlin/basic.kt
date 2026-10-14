package snippets.side_effects.basic

import verification.support.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
LaunchedEffect(userId) {
    viewModel.loadProfile(userId)
}
// #endregion

}
