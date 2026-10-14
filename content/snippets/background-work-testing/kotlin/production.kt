package snippets.background_work_testing.production

import verification.support.*
import androidx.work.*
import androidx.work.testing.*
fun verificationSnippet() {
// #region show
WorkManagerTestInitHelper.initializeTestWorkManager(context)
val request = OneTimeWorkRequestBuilder<SyncWorker>().build()
workManager.enqueue(request).result.get()
WorkManagerTestInitHelper.getTestDriver(context)!!
    .setAllConstraintsMet(request.id)
// #endregion

}
