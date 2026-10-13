package snippets.durable_background_work.basic

// #region show
class SyncWorker(context: Context, params: WorkerParameters) : CoroutineWorker(context, params) {
    override suspend fun doWork(): Result = try {
        syncRepository.syncPending()
        Result.success()
    } catch (error: IOException) {
        Result.retry()
    }
}
// #endregion
