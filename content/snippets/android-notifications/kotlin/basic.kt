package snippets.android_notifications.basic

// #region show
val notification = NotificationCompat.Builder(context, REMINDER_CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_notification)
    .setContentTitle(context.getString(R.string.saved_post_title))
    .setContentText(post.title)
    .build()
NotificationManagerCompat.from(context).notify(post.id.hashCode(), notification)
// #endregion
