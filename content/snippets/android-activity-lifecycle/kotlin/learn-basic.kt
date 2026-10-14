package snippets.android_activity_lifecycle.learn_basic

import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.lifecycle.compose.*
@Composable fun VerificationSnippet() {
// #region show
LifecycleEventEffect(Lifecycle.Event.ON_RESUME) {
    analytics.trackVisible()
}
// #endregion

}
