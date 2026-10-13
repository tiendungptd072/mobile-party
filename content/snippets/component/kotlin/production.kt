package snippets.component.production

// #region show
@Composable
fun ProfileRoute(viewModel: ProfileViewModel = viewModel()) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    ProfileScreen(state, onRetry = viewModel::retry)
}
// #endregion
