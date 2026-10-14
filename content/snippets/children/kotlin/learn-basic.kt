package snippets.children.learn_basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
@Composable
fun Card(content: @Composable () -> Unit) {
    Surface(shape = MaterialTheme.shapes.medium, content = content)
}
// #endregion
