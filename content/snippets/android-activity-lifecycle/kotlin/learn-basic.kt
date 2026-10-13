package snippets.android_activity_lifecycle.learn_basic

// #region show
LifecycleEventEffect(Lifecycle.Event.ON_RESUME) {
    analytics.trackVisible()
}
// #endregion
