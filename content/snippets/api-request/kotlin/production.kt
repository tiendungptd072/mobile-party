package snippets.api_request.production

// #region show
suspend fun loadUser(id: String): UserResult = try {
    UserResult.Success(repository.getUser(id))
} catch (cancelled: CancellationException) {
    throw cancelled
} catch (error: Throwable) {
    UserResult.Failure(error.toUserError())
}
// #endregion
