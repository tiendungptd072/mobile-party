package snippets.background_work_testing.applied

import verification.support.*
import org.junit.Assert.*
import androidx.work.ListenableWorker.Result
suspend fun verificationSnippet() {
// #region show
assertEquals(Result.retry(), runWorker(NetworkError()))
assertEquals(Result.failure(), runWorker(ValidationError()))
// #endregion

}
