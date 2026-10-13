package snippets.android_activity_lifecycle.applied

// #region show
LifecycleResumeEffect(camera) {
    camera.startPreview()
    onPauseOrDispose { camera.stopPreview() }
}
// #endregion
