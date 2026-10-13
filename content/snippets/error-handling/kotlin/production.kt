package snippets.error_handling.production

// #region show
suspend fun load(): ProfileUiState = try {
    ProfileUiState.Ready(repository.load())
} catch (cancelled: CancellationException) {
    throw cancelled
} catch (error: Throwable) {
    ProfileUiState.Error(error.toProfileError())
}
// #endregion
