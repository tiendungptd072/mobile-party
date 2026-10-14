package snippets.button.applied

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
@Composable
fun SaveButton(isSaving: Boolean, canSave: Boolean, onSave: () -> Unit) {
    Button(onClick = onSave, enabled = canSave && !isSaving) {
        Text(if (isSaving) "Saving…" else "Save")
    }
}
// #endregion
