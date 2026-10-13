package snippets.android_notifications.learn_basic

// #region show
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    val channel = NotificationChannel(
        REMINDER_CHANNEL_ID, context.getString(R.string.reminder_channel),
        NotificationManager.IMPORTANCE_DEFAULT,
    )
    context.getSystemService(NotificationManager::class.java)
        .createNotificationChannel(channel)
}
// #endregion
