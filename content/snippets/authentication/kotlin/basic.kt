package snippets.authentication.basic

// #region show
@Composable
fun AppGate(viewModel: SessionViewModel = viewModel()) {
  val state by viewModel.state.collectAsStateWithLifecycle()

  when (state) {
    SessionState.Restoring -> SplashScreen()
    SessionState.SignedOut -> AuthNavGraph()
    is SessionState.SignedIn -> AppNavGraph()
  }
}
// #endregion
