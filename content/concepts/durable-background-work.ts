export const durableBackgroundWorkConcept = {
  id: "durable-background-work",
  slug: "durable-background-work",
  title: "Durable Background Work",
  description:
    "Schedule deferrable sync outside a screen lifetime, with network constraints, unique work, and explicit retry behavior.",
  category: "architecture",
  order: 45.9,
  aliases: ["WorkManager", "CoroutineWorker", "Headless JS", "background sync"],
  keywords: ["background", "sync", "retry", "constraints", "unique work"],
  implementations: {
    "react-native": {
      name: "Headless JS task with native scheduling",
      summary:
        "A native Android scheduler can start registered JavaScript work after the UI is gone.",
      language: "tsx",
      filename: "sync-task.ts",
      code: `AppRegistry.registerHeadlessTask("SyncPending", () => async () => {
  await syncRepository.syncPending();
});`,
    },
    kotlin: {
      name: "CoroutineWorker",
      summary:
        "WorkManager owns the request and invokes a suspending worker when constraints permit.",
      language: "kotlin",
      filename: "SyncWorker.kt",
      code: `class SyncWorker(context: Context, params: WorkerParameters) : CoroutineWorker(context, params) {
    override suspend fun doWork(): Result = try {
        syncRepository.syncPending()
        Result.success()
    } catch (error: IOException) {
        Result.retry()
    }
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "different",
      explanation:
        "Headless JS runs a registered JavaScript task when Android native code starts its service; registration alone does not persist or schedule work. WorkManager persists and schedules a work request under Android constraints.",
    },
  ],
  mentalModel:
    "A screen coroutine or React effect owns work only while its owner lives. Use WorkManager for deferrable operations that must survive leaving the screen or process; let the worker call a repository operation that is safe to retry.",
  differences: [
    "WorkManager schedules one-time or periodic work and may delay it to satisfy network, battery, and system constraints; it is not an exact timer.",
    "React Native needs Android-native scheduling or a library built on it for durable jobs. Headless JS describes execution of JavaScript, not the scheduling policy.",
  ],
  commonMistakes: [
    "Starting sync from a screen effect and assuming it will finish after the process is killed.",
    "Enqueuing duplicate work on every app start or retrying an authorization or validation failure forever.",
  ],
  productionNotes: [
    "Enqueue unique work with a deliberate replacement policy and network constraint; make the repository operation idempotent before allowing retries.",
    "Return retry for transient failures and failure for permanent ones. Expose WorkInfo or repository state when the user needs to see pending sync.",
  ],
} as const;
