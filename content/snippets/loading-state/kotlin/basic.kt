package snippets.loading_state.basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
sealed interface ProfileUiState {
  data object Loading : ProfileUiState
  data class Ready(val profile: Profile) : ProfileUiState
}

@Composable
fun ProfileScreen(state: ProfileUiState) = when (state) {
  ProfileUiState.Loading -> CircularProgressIndicator()
  is ProfileUiState.Ready -> ProfileCard(state.profile)
}
// #endregion
