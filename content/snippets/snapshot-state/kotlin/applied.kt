package snippets.snapshot_state.applied

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
@Composable
fun Tags() {
    val tags = remember { mutableStateListOf("one", "two") }
    Column {
        tags.forEach { tag ->
            key(tag) { TextButton(onClick = { tags.remove(tag) }) { Text(tag) } }
        }
    }
}
// #endregion
