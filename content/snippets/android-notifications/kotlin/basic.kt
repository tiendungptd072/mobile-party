package snippets.android_notifications.basic

import verification.support.*
import androidx.core.app.*
import party.mobile.verification.R
fun verificationSnippet() {
// #region show
val notification = NotificationCompat.Builder(context, REMINDER_CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_notification)
    .setContentTitle(context.getString(R.string.saved_post_title))
    .setContentText(post.title)
    .build()
NotificationManagerCompat.from(context).notify(post.id.hashCode(), notification)
// #endregion

}
