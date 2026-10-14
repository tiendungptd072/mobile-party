package snippets.error_handling.basic

import verification.support.*
import androidx.compose.runtime.*
// #region show
sealed interface ProfileUiState {
  data class Ready(val profile: Profile) : ProfileUiState
  data class Error(val message: String) : ProfileUiState
}

@Composable
fun ProfileScreen(state: ProfileUiState, onRetry: () -> Unit) = when (state) {
  is ProfileUiState.Error -> ErrorPanel(state.message, onRetry)
  is ProfileUiState.Ready -> ProfileCard(state.profile)
}
// #endregion
