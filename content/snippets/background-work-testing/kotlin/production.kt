package snippets.background_work_testing.production

// #region show
WorkManagerTestInitHelper.initializeTestWorkManager(context)
val request = OneTimeWorkRequestBuilder<SyncWorker>().build()
workManager.enqueue(request).result.get()
WorkManagerTestInitHelper.getTestDriver(context)!!
    .setAllConstraintsMet(request.id)
// #endregion
