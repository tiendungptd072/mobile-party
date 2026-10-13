package snippets.loading_state.learn_basic

// #region show
when (state) {
    ProfileUiState.Loading -> CircularProgressIndicator()
    is ProfileUiState.Ready -> ProfileView(state.profile)
}
// #endregion
