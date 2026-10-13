package snippets.background_work_testing.applied

// #region show
assertEquals(Result.retry(), runWorker(NetworkError()))
assertEquals(Result.failure(), runWorker(ValidationError()))
// #endregion
