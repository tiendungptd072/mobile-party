package snippets.button.learn_basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
@Composable
fun SaveButton(onSave: () -> Unit) {
    Button(onClick = onSave) { Text("Save") }
}
// #endregion
