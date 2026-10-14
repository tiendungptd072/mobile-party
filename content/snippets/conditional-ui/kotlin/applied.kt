package snippets.conditional_ui.applied

import verification.support.*
import androidx.compose.runtime.*
val state: UiState = UiState.Loading
@Composable fun VerificationSnippet() {
// #region show
when (state) {
    UiState.Loading -> LoadingView()
    UiState.Empty -> EmptyView()
    is UiState.Ready -> Content(state.data)
}
// #endregion

}
