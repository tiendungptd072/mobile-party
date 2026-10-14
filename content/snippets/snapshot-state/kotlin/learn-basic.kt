package snippets.snapshot_state.learn_basic

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
@Composable
fun Tags() {
    val tags = remember { mutableStateListOf<String>() }
    Button(onClick = { tags.add("new") }) { Text(tags.size.toString()) }
}
// #endregion
