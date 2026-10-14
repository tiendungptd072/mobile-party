package snippets.gesture_abstractions.basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
Button(onClick = onArchive) {
    Text("Archive")
}
// #endregion

}
