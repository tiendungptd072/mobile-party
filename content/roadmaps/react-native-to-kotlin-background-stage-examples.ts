export const backgroundStageExamples = {
  "durable-background-work": {
    basic: {
      "react-native": {
        name: "Register JavaScript work",
        summary: "Android native code must start this Headless JS task.",
        language: "tsx",
        filename: "sync-task.ts",
        snippet: "durable-background-work/react-native/basic.tsx",
      },
      kotlin: {
        name: "Define a suspendable worker",
        summary: "WorkManager can invoke this unit independently of a screen.",
        language: "kotlin",
        filename: "SyncWorker.kt",
        snippet: "durable-background-work/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Schedule through an Android bridge",
        summary:
          "The bridge is app-defined and delegates scheduling to Android.",
        language: "tsx",
        filename: "schedule-sync.ts",
        snippet: "durable-background-work/react-native/applied.tsx",
      },
      kotlin: {
        name: "Constrain and deduplicate sync",
        summary: "One pending request waits for network availability.",
        language: "kotlin",
        filename: "SyncScheduler.kt",
        snippet: "durable-background-work/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Make replay safe",
        summary:
          "Each queued operation has a stable identifier across attempts.",
        language: "typescript",
        filename: "pending-action.ts",
        snippet: "durable-background-work/react-native/production.tsx",
      },
      kotlin: {
        name: "Classify retryable failures",
        summary: "Only transient network failures are retried.",
        language: "kotlin",
        filename: "SyncWorker.kt",
        snippet: "durable-background-work/kotlin/production.kt",
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
        snippet: "android-notifications/react-native/learn-basic.tsx",
      },
      kotlin: {
        name: "Create a channel",
        summary: "Channel setup precedes notification posting on Android 8.0+.",
        language: "kotlin",
        filename: "ReminderChannel.kt",
        snippet: "android-notifications/kotlin/learn-basic.kt",
      },
    },
    applied: {
      "react-native": {
        name: "Ask after user intent",
        summary:
          "The app-owned bridge prompts when the user enables reminders.",
        language: "tsx",
        filename: "ReminderSettings.tsx",
        snippet: "android-notifications/react-native/applied.tsx",
      },
      kotlin: {
        name: "Request notification permission",
        summary:
          "On Android 13+, request after a relevant tap and handle denial.",
        language: "kotlin",
        filename: "ReminderSettings.kt",
        snippet: "android-notifications/kotlin/applied.kt",
      },
    },
    production: {
      "react-native": {
        name: "Route the notification tap",
        summary:
          "The native bridge delivers a post ID for cold and warm navigation.",
        language: "tsx",
        filename: "notification-routing.ts",
        snippet: "android-notifications/react-native/production.tsx",
      },
      kotlin: {
        name: "Attach a tap destination",
        summary: "An immutable PendingIntent opens the intended post.",
        language: "kotlin",
        filename: "ReminderNotifier.kt",
        snippet: "android-notifications/kotlin/production.kt",
      },
    },
  },
} as const;
