package snippets.lifecycle.basic

// #region show
DisposableEffect(lifecycleOwner) {
    val observer = LifecycleEventObserver { _, event -> track(event) }
    lifecycleOwner.lifecycle.addObserver(observer)
    onDispose { lifecycleOwner.lifecycle.removeObserver(observer) }
}
// #endregion
