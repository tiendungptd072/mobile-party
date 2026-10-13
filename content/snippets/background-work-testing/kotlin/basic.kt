package snippets.background_work_testing.basic

// #region show
@Test fun retriesNetworkFailure() = runTest {
    val worker = TestListenableWorkerBuilder<SyncWorker>(context)
        .setInputData(workDataOf("accountId" to "ada"))
        .build()

    assertEquals(ListenableWorker.Result.retry(), worker.doWork())
}
// #endregion
