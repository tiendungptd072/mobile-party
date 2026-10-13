package snippets.android_notifications.production

// #region show
val intent = Intent(context, MainActivity::class.java)
    .putExtra("postId", post.id)
val tap = PendingIntent.getActivity(
    context, post.id.hashCode(), intent,
    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
)
val notification = NotificationCompat.Builder(context, REMINDER_CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_notification)
    .setContentTitle(context.getString(R.string.saved_post_title))
    .setContentIntent(tap).setAutoCancel(true).build()
// #endregion
