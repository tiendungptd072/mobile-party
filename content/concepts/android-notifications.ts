export const androidNotificationsConcept = {
  id: "android-notifications",
  slug: "android-notifications",
  title: "Android Notifications",
  description:
    "Send user-visible Android notifications through a channel, request permission in context, and route taps to the intended content.",
  category: "interaction",
  order: 45.95,
  aliases: [
    "NotificationCompat",
    "notification channel",
    "POST_NOTIFICATIONS",
    "local notification",
  ],
  keywords: [
    "notification",
    "permission",
    "channel",
    "PendingIntent",
    "Android 13",
  ],
  implementations: {
    "react-native": {
      name: "App-defined native notification bridge",
      summary:
        "React Native UI calls an app-owned Android bridge or library; the platform still owns delivery.",
      language: "tsx",
      filename: "reminder.ts",
      code: `interface ReminderNotifier {
  show(postId: string, title: string): Promise<void>;
}

async function notifySavedPost(notifier: ReminderNotifier, post: Post) {
  await notifier.show(post.id, post.title);
}`,
    },
    kotlin: {
      name: "NotificationCompat on a channel",
      summary:
        "Android posts a notification using a registered channel and a small icon.",
      language: "kotlin",
      filename: "ReminderNotifier.kt",
      code: `val notification = NotificationCompat.Builder(context, REMINDER_CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_notification)
    .setContentTitle(context.getString(R.string.saved_post_title))
    .setContentText(post.title)
    .build()
NotificationManagerCompat.from(context).notify(post.id.hashCode(), notification)`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "different",
      explanation:
        "React Native has no cross-platform core local-notification API; an Android bridge or library eventually uses the same platform channel, permission, and notification manager as native Kotlin code.",
    },
  ],
  mentalModel:
    "Notification delivery belongs to Android, even when React Native initiates it. Treat channel creation, permission, content intent, and tap navigation as platform behavior that both implementations must design.",
  differences: [
    "Android 8.0+ requires a registered notification channel; users can control its importance after creation.",
    "Android 13+ requires POST_NOTIFICATIONS for most notifications, while the app must still handle a denied permission without blocking its core task.",
  ],
  commonMistakes: [
    "Posting before channel creation or assuming a notification library bypasses Android permission rules.",
    "Requesting permission on launch without explaining the feature, or forgetting the tap destination and back stack.",
  ],
  productionNotes: [
    "Create a stable channel at app startup, localize its name and message, and request permission after a relevant user action.",
    "Use a PendingIntent for the target screen and test a notification tap from a cold app start as well as after denial.",
  ],
} as const;
