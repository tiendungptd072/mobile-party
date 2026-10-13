package snippets.android_activity_lifecycle.basic

// #region show
@Composable
fun ForegroundTracker(analytics: Analytics) {
    LifecycleEventEffect(Lifecycle.Event.ON_RESUME) {
        analytics.trackVisible()
    }
}
// #endregion
