package snippets.coroutine_scopes.basic

// #region show
var user by remember(userId) { mutableStateOf<User?>(null) }
var hasError by remember(userId) { mutableStateOf(false) }
LaunchedEffect(userId) {
    hasError = false
    try {
        user = repository.loadUser(userId)
    } catch (cancelled: CancellationException) {
        throw cancelled
    } catch (_: Exception) {
        hasError = true
    }
}
// #endregion
