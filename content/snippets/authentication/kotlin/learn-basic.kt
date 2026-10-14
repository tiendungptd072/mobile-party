package snippets.authentication.learn_basic

import verification.support.*
import androidx.compose.runtime.*
// #region show
@Composable
fun AppGate(state: SessionState) = when (state) {
    SessionState.Restoring -> SplashScreen()
    SessionState.SignedOut -> AuthNavGraph()
    is SessionState.SignedIn -> AppNavGraph()
}
// #endregion
