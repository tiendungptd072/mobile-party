package snippets.lifecycle.applied

import verification.support.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
DisposableEffect(chat, roomId) {
    val connection = chat.connect(roomId).also { it.start() }
    onDispose { connection.stop() }
}
// #endregion

}
