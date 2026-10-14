package snippets.durable_background_work.applied

import verification.support.*
import androidx.work.*
fun verificationSnippet() {
// #region show
val request = OneTimeWorkRequestBuilder<SyncWorker>()
    .setConstraints(Constraints.Builder()
        .setRequiredNetworkType(NetworkType.CONNECTED).build())
    .build()
workManager.enqueueUniqueWork("pending-sync", ExistingWorkPolicy.KEEP, request)
// #endregion

}
