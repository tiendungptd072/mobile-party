package snippets.conditional_ui.applied

// #region show
when (state) {
    UiState.Loading -> LoadingView()
    UiState.Empty -> EmptyView()
    is UiState.Ready -> Content(state.data)
}
// #endregion
