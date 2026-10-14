package snippets.android_resources.production

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.res.*
import party.mobile.verification.R
// #region show
// res/values/strings.xml:
// <plurals name="message_count">
//   <item quantity="one">%1$d message</item>
//   <item quantity="other">%1$d messages</item>
// </plurals>
// res/values-vi/strings.xml:
// <plurals name="message_count">
//   <item quantity="other">%1$d tin nhắn</item>
// </plurals>
@Composable
fun MessageCount(count: Int) {
    Text(pluralStringResource(R.plurals.message_count, count, count))
}
// #endregion
