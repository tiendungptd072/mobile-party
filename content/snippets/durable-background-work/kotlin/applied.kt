package snippets.durable_background_work.applied

// #region show
val request = OneTimeWorkRequestBuilder<SyncWorker>()
    .setConstraints(Constraints.Builder()
        .setRequiredNetworkType(NetworkType.CONNECTED).build())
    .build()
workManager.enqueueUniqueWork("pending-sync", ExistingWorkPolicy.KEEP, request)
// #endregion
