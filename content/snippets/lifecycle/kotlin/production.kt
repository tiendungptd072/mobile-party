package snippets.lifecycle.production

// #region show
@Composable
fun SessionRoute(viewModel: SessionViewModel = viewModel()) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    SessionScreen(state)
}
// #endregion
