package snippets.loading_state.applied

import verification.support.*
import androidx.compose.runtime.*
val state: ProfilesUiState = ProfilesUiState.Loading
@Composable fun VerificationSnippet() {
// #region show
when (state) {
    ProfilesUiState.Loading -> LoadingView()
    ProfilesUiState.Empty -> EmptyView()
    is ProfilesUiState.Ready -> ProfileList(state.items)
}
// #endregion

}
