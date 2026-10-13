package snippets.flow_and_stateflow.applied

// #region show
@Composable
fun FeedRoute(viewModel: FeedViewModel) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    FeedScreen(state)
}
// #endregion
