package snippets.error_handling.learn_basic

import verification.support.*
import androidx.compose.runtime.*
val state: ProfileUiState = ProfileUiState.Loading
@Composable fun VerificationSnippet() {
// #region show
if (state is ProfileUiState.Error) {
    ErrorView(message = "Could not load profile", onRetry = onRetry)
}
// #endregion

}
