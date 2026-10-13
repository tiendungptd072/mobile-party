package snippets.lifecycle.learn_basic

// #region show
DisposableEffect(connectivity) {
    val listener = ConnectivityListener(onStatusChanged)
    connectivity.addListener(listener)
    onDispose { connectivity.removeListener(listener) }
}
// #endregion
