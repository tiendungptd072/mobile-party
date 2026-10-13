package snippets.flow_and_stateflow.basic

// #region show
@Composable
fun FeedRoute(viewModel: FeedViewModel) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    FeedScreen(state)
}
// #endregion
