package snippets.background_work_testing.learn_basic

// #region show
val worker = TestListenableWorkerBuilder<SyncWorker>(context).build()
assertEquals(ListenableWorker.Result.retry(), worker.doWork())
// #endregion
