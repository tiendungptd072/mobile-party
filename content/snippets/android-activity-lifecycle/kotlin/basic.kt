package snippets.android_activity_lifecycle.basic

import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.lifecycle.compose.*
// #region show
@Composable
fun ForegroundTracker(analytics: Analytics) {
    LifecycleEventEffect(Lifecycle.Event.ON_RESUME) {
        analytics.trackVisible()
    }
}
// #endregion
