package snippets.durable_background_work.learn_basic

import verification.support.*
import android.content.*
import androidx.work.*
// #region show
class SyncWorker(context: Context, params: WorkerParameters) : CoroutineWorker(context, params) {
    override suspend fun doWork(): Result {
        syncRepository.syncPending()
        return Result.success()
    }
}
// #endregion
