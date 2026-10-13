package snippets.sealed_types.basic

// #region show
sealed interface ProfileUiState {
    data object Loading : ProfileUiState
    data class Ready(val profile: Profile) : ProfileUiState
    data class Error(val message: String) : ProfileUiState
}
// #endregion
