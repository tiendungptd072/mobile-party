package snippets.loading_state.applied

// #region show
when (state) {
    ProfilesUiState.Loading -> LoadingView()
    ProfilesUiState.Empty -> EmptyView()
    is ProfilesUiState.Ready -> ProfileList(state.items)
}
// #endregion
