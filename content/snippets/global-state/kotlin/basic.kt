package snippets.global_state.basic

// #region show
@Composable
fun ProfileRoute(viewModel: ProfileViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    ProfileScreen(uiState, viewModel::signOut)
}
// #endregion
