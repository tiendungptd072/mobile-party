package snippets.stability_and_skipping.production

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
@Composable
fun UserRow(name: String, onOpen: () -> Unit) {
    TextButton(onClick = onOpen) { Text(name) }
}
// #endregion
