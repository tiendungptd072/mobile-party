package snippets.background_work_testing.basic

import verification.support.*
import androidx.work.*
import androidx.work.testing.*
import kotlinx.coroutines.test.*
import org.junit.Test
import org.junit.Assert.*
// #region show
@Test fun retriesNetworkFailure() = runTest {
    val worker = TestListenableWorkerBuilder<SyncWorker>(context)
        .setInputData(workDataOf("accountId" to "ada"))
        .build()

    assertEquals(ListenableWorker.Result.retry(), worker.doWork())
}
// #endregion
