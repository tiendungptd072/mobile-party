package snippets.side_effects.basic

// #region show
LaunchedEffect(userId) {
    viewModel.loadProfile(userId)
}
// #endregion
