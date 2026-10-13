package snippets.durable_background_work.production

// #region show
override suspend fun doWork(): Result = try {
    repository.syncPending()
    Result.success()
} catch (error: IOException) {
    Result.retry()
} catch (error: InvalidPendingAction) {
    Result.failure()
}
// #endregion
