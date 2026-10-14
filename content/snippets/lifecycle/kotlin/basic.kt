package snippets.lifecycle.basic

import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
@Composable fun VerificationSnippet() {
// #region show
DisposableEffect(lifecycleOwner) {
    val observer = LifecycleEventObserver { _, event -> track(event) }
    lifecycleOwner.lifecycle.addObserver(observer)
    onDispose { lifecycleOwner.lifecycle.removeObserver(observer) }
}
// #endregion

}
