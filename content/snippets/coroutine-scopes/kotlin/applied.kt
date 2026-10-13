package snippets.coroutine_scopes.applied

// #region show
var items by remember(query) { mutableStateOf<List<Item>>(emptyList()) }
var hasError by remember(query) { mutableStateOf(false) }
LaunchedEffect(query) {
    hasError = false
    try {
        items = repository.search(query)
    } catch (cancelled: CancellationException) {
        throw cancelled
    } catch (_: Exception) {
        hasError = true
    }
}
// #endregion
