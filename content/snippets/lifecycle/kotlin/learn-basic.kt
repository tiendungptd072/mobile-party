package snippets.lifecycle.learn_basic

import verification.support.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
DisposableEffect(connectivity) {
    val listener = ConnectivityListener(onStatusChanged)
    connectivity.addListener(listener)
    onDispose { connectivity.removeListener(listener) }
}
// #endregion

}
