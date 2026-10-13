package snippets.side_effects.production

// #region show
val currentOnTimeout by rememberUpdatedState(onTimeout)

LaunchedEffect(Unit) {
    delay(2_000)
    currentOnTimeout()
}
// #endregion
