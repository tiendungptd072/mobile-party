package snippets.loading_state.learn_basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
val state: ProfileUiState = ProfileUiState.Loading
@Composable fun VerificationSnippet() {
// #region show
when (state) {
    ProfileUiState.Loading -> CircularProgressIndicator()
    is ProfileUiState.Ready -> ProfileView(state.profile)
}
// #endregion

}
