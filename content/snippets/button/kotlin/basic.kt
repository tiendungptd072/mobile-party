package snippets.button.basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
@Composable
fun SaveButton(saving: Boolean, onSave: () -> Unit) {
  Button(onClick = onSave, enabled = !saving) {
    Text(if (saving) "Saving…" else "Save")
  }
}
// #endregion
