package snippets.accessibility_semantics.learn_basic

import verification.support.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
IconButton(onClick = onDelete) {
    Icon(Icons.Default.Delete, contentDescription = "Delete draft")
}
// #endregion

}
