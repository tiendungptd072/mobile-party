package snippets.composition_local.applied

// #region show
CompositionLocalProvider(LocalSpacing provides 8.dp) {
    Card()
    CompositionLocalProvider(LocalSpacing provides 24.dp) { Card() }
}
// #endregion
