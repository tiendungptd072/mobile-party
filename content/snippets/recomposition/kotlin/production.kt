package snippets.recomposition.production

// #region show
@Composable
fun ProfileRoute(viewModel: ProfileViewModel = viewModel()) {
    val profile by viewModel.profile.collectAsStateWithLifecycle()
    ProfileScreen(profile)
}
// #endregion
