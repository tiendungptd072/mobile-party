package snippets.android_intents.basic

import verification.support.*
import android.content.*
import android.net.Uri
import kotlinx.coroutines.flow.*
// #region show
fun openHelp(context: Context) {
    val uri = Uri.parse("https://example.com/help")
    try {
        context.startActivity(Intent(Intent.ACTION_VIEW, uri))
    } catch (_: ActivityNotFoundException) {
        showUnavailable()
    }
}
// #endregion
