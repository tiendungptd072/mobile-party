package snippets.authentication.basic

import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.compose.*
import androidx.lifecycle.viewmodel.compose.viewModel
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
