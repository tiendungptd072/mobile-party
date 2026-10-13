package snippets.conditional_ui.production

// #region show
sealed interface UiState {
    data object Loading : UiState
    data object Empty : UiState
    data class Error(val retryable: Boolean) : UiState
    data class Ready(val data: Profile) : UiState
}
// #endregion
