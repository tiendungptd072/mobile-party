package snippets.async.applied

// #region show
LaunchedEffect(userId) {
    try {
        user = repository.getUser(userId)
    } catch (cancelled: CancellationException) {
        throw cancelled
    } catch (error: Exception) {
        reportError(error)
    }
}
// A changed key cancels the previous coroutine.
// #endregion
