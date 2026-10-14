package snippets.back_navigation.applied

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
if (showDiscardDialog) {
    AlertDialog(
        onDismissRequest = { showDiscardDialog = false },
        confirmButton = { TextButton(onClick = navController::popBackStack) { Text("Discard") } },
        dismissButton = { TextButton(onClick = { showDiscardDialog = false }) { Text("Keep editing") } },
    )
}
// #endregion

}
