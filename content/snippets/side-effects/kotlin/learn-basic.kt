package snippets.side_effects.learn_basic

// #region show
LaunchedEffect(query, onSearch) {
    if (query.isBlank()) return@LaunchedEffect
    delay(300)
    onSearch(query)
}
// #endregion
