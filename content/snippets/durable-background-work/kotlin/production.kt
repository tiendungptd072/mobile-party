package snippets.durable_background_work.production

import verification.support.*
import android.content.*
import androidx.work.*
import kotlinx.coroutines.flow.*
import java.io.IOException
class VerificationWorker(context: Context, params: WorkerParameters) : CoroutineWorker(context, params) {
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

}
