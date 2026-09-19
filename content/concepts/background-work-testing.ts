export const backgroundWorkTestingConcept = {
  id: "background-work-testing",
  slug: "background-work-testing",
  title: "Testing Background Work",
  description:
    "Test retry and permanent-failure policy in a worker without real time, then use WorkManager's test driver only for the scheduling behavior that matters.",
  category: "testing",
  order: 45.99,
  aliases: ["WorkManager test", "worker test", "background job test"],
  keywords: ["WorkManager", "CoroutineWorker", "retry", "TestDriver", "worker"],
  implementations: {
    "react-native": {
      name: "Test the sync scheduling contract",
      summary:
        "Use a fake scheduler to verify unique work and retry policy without running Headless JS.",
      language: "typescript",
      filename: "sync-scheduler.test.ts",
      code: `const scheduler = new FakeSyncScheduler();
await schedulePendingSync(scheduler);
await schedulePendingSync(scheduler);

expect(scheduler.uniqueWork).toEqual([
  { name: "pending-sync", policy: "keep" },
]);`,
    },
    kotlin: {
      name: "Test a CoroutineWorker result",
      summary:
        "Build the worker with controlled input and assert retry versus permanent failure directly.",
      language: "kotlin",
      filename: "SyncWorkerTest.kt",
      code: `@Test fun retriesNetworkFailure() = runTest {
    val worker = TestListenableWorkerBuilder<SyncWorker>(context)
        .setInputData(workDataOf("accountId" to "ada"))
        .build()

    assertEquals(ListenableWorker.Result.retry(), worker.doWork())
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "different",
      explanation:
        "React Native usually isolates its app scheduling contract behind a fake because the durable scheduler is native. Android exposes WorkManager test utilities that can test a worker directly and drive constraints in an integration test.",
    },
  ],
  mentalModel:
    "Separate work policy from the operating-system scheduler. Unit-test what success, retry, and permanent failure mean; use one integration test to prove that a constrained WorkRequest becomes eligible when the test driver releases it.",
  differences: [
    "Headless JS is an Android bridge entry point, not a portable replacement for WorkManager's persisted constraints and retry semantics.",
    "TestListenableWorkerBuilder tests worker logic without initializing WorkManager; WorkManagerTestInitHelper and TestDriver are for the smaller set of scheduling integrations.",
  ],
  commonMistakes: [
    "Sleeping in a test to wait for backoff or network conditions instead of driving the scheduler through WorkManager's test APIs.",
    "Returning success after a transient failure, or retrying a validation failure forever and creating an unobservable loop.",
  ],
  productionNotes: [
    "Keep worker input small and durable, make the underlying repository operation idempotent, and map failures intentionally to Result.success(), Result.retry(), or Result.failure().",
    "Use WorkManagerTestInitHelper with a TestDriver to test constraints and initial delays; do not duplicate every unit test as a slow scheduler integration test.",
  ],
} as const;
