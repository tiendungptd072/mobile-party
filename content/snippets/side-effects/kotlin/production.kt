package snippets.side_effects.production

import verification.support.*
import androidx.compose.runtime.*
import kotlinx.coroutines.*
@Composable fun VerificationSnippet() {
// #region show
val currentOnTimeout by rememberUpdatedState(onTimeout)

LaunchedEffect(Unit) {
    delay(2_000)
    currentOnTimeout()
}
// #endregion

}
