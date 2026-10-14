package snippets.android_intents.production

import verification.support.*
import android.content.*
import android.net.Uri
import android.os.*
import androidx.activity.ComponentActivity
import androidx.activity.compose.*
class VerificationActivity : ComponentActivity() {
// #region show
private val navigator = AppNavigator()

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContent { AppRoot(navigator) }
    openExternalUri(intent.data)
}

override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    setIntent(intent)
    openExternalUri(intent.data)
}

private fun openExternalUri(uri: Uri?) {
    if (uri == null) return
    navigator.open(parseDestination(uri) ?: Destination.InvalidLink)
}
// #endregion

}
