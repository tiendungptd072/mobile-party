package snippets.background_work_testing.learn_basic

import verification.support.*
import androidx.work.*
import androidx.work.testing.*
import org.junit.Assert.*
suspend fun verificationSnippet() {
// #region show
val worker = TestListenableWorkerBuilder<SyncWorker>(context).build()
assertEquals(ListenableWorker.Result.retry(), worker.doWork())
// #endregion

}
