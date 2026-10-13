package snippets.error_handling.learn_basic

// #region show
if (state is ProfileUiState.Error) {
    ErrorView(message = "Could not load profile", onRetry = onRetry)
}
// #endregion
