package snippets.loading_state.basic

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
