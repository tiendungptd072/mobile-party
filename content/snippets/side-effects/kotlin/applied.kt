package snippets.side_effects.applied

import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.lifecycle.compose.LocalLifecycleOwner
@Composable fun VerificationSnippet() {
// #region show
val owner = LocalLifecycleOwner.current
val currentOnEvent by rememberUpdatedState(onEvent)

DisposableEffect(owner) {
    val observer = LifecycleEventObserver { _, event -> currentOnEvent(event) }
    owner.lifecycle.addObserver(observer)
    onDispose { owner.lifecycle.removeObserver(observer) }
}
// #endregion

}
