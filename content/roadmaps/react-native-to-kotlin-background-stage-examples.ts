export const backgroundStageExamples = {
  "durable-background-work": {
    basic: {
      "react-native": {
        name: "Register JavaScript work",
        summary: "Android native code must start this Headless JS task.",
        language: "tsx",
        filename: "sync-task.ts",
        code: `AppRegistry.registerHeadlessTask("SyncPending", () => async () => {
  await syncRepository.syncPending();
});`,
      },
      kotlin: {
        name: "Define a suspendable worker",
        summary: "WorkManager can invoke this unit independently of a screen.",
        language: "kotlin",
        filename: "SyncWorker.kt",
        code: `class SyncWorker(context: Context, params: WorkerParameters) : CoroutineWorker(context, params) {
    override suspend fun doWork(): Result {
        syncRepository.syncPending()
        return Result.success()
    }
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Schedule through an Android bridge",
        summary:
          "The bridge is app-defined and delegates scheduling to Android.",
        language: "tsx",
        filename: "schedule-sync.ts",
        code: `interface SyncScheduler { enqueue(): Promise<void> }
await scheduler.enqueue();`,
      },
      kotlin: {
        name: "Constrain and deduplicate sync",
        summary: "One pending request waits for network availability.",
        language: "kotlin",
        filename: "SyncScheduler.kt",
        code: `val request = OneTimeWorkRequestBuilder<SyncWorker>()
    .setConstraints(Constraints.Builder()
        .setRequiredNetworkType(NetworkType.CONNECTED).build())
    .build()
workManager.enqueueUniqueWork("pending-sync", ExistingWorkPolicy.KEEP, request)`,
      },
    },
    production: {
      "react-native": {
        name: "Make replay safe",
        summary:
          "Each queued operation has a stable identifier across attempts.",
        language: "typescript",
        filename: "pending-action.ts",
        code: `await pendingActions.enqueue({
  idempotencyKey: action.id,
  postId: action.postId,
  desiredBookmark: action.desiredBookmark,
});`,
      },
      kotlin: {
        name: "Classify retryable failures",
        summary: "Only transient network failures are retried.",
        language: "kotlin",
        filename: "SyncWorker.kt",
        code: `override suspend fun doWork(): Result = try {
    repository.syncPending()
    Result.success()
} catch (error: IOException) {
    Result.retry()
} catch (error: InvalidPendingAction) {
    Result.failure()
}`,
      },
    },
  },
  "android-notifications": {
    basic: {
      "react-native": {
        name: "Define a notification boundary",
        summary:
          "The UI depends on a notifier contract implemented by Android native code.",
        language: "tsx",
        filename: "reminder-notifier.ts",
        code: `interface ReminderNotifier {
  show(postId: string, title: string): Promise<void>;
}
await notifier.show(post.id, post.title);`,
      },
      kotlin: {
        name: "Create a channel",
        summary: "Channel setup precedes notification posting on Android 8.0+.",
        language: "kotlin",
        filename: "ReminderChannel.kt",
        code: `if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    val channel = NotificationChannel(
        REMINDER_CHANNEL_ID, context.getString(R.string.reminder_channel),
        NotificationManager.IMPORTANCE_DEFAULT,
    )
    context.getSystemService(NotificationManager::class.java)
        .createNotificationChannel(channel)
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Ask after user intent",
        summary:
          "The app-owned bridge prompts when the user enables reminders.",
        language: "tsx",
        filename: "ReminderSettings.tsx",
        code: `<Button title="Enable reminders" onPress={async () => {
  const granted = await notifier.requestPermission();
  setRemindersEnabled(granted);
}} />`,
      },
      kotlin: {
        name: "Request notification permission",
        summary:
          "On Android 13+, request after a relevant tap and handle denial.",
        language: "kotlin",
        filename: "ReminderSettings.kt",
        code: `val launcher = rememberLauncherForActivityResult(
    ActivityResultContracts.RequestPermission(),
) { granted -> onPermissionResult(granted) }
Button(onClick = {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        launcher.launch(Manifest.permission.POST_NOTIFICATIONS)
    } else onPermissionResult(true)
}) { Text(stringResource(R.string.enable_reminders)) }`,
      },
    },
    production: {
      "react-native": {
        name: "Route the notification tap",
        summary:
          "The native bridge delivers a post ID for cold and warm navigation.",
        language: "tsx",
        filename: "notification-routing.ts",
        code: `const target = await notifier.getInitialTarget();
if (target?.postId) navigation.navigate("Post", { id: target.postId });`,
      },
      kotlin: {
        name: "Attach a tap destination",
        summary: "An immutable PendingIntent opens the intended post.",
        language: "kotlin",
        filename: "ReminderNotifier.kt",
        code: `val intent = Intent(context, MainActivity::class.java)
    .putExtra("postId", post.id)
val tap = PendingIntent.getActivity(
    context, post.id.hashCode(), intent,
    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
)
val notification = NotificationCompat.Builder(context, REMINDER_CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_notification)
    .setContentTitle(context.getString(R.string.saved_post_title))
    .setContentIntent(tap).setAutoCancel(true).build()`,
      },
    },
  },
} as const;
