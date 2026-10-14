package snippets.durable_background_work.basic

import verification.support.*
import android.content.*
import androidx.work.*
import kotlinx.coroutines.flow.*
import java.io.IOException
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
