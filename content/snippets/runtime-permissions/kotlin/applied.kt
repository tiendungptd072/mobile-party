package snippets.runtime_permissions.applied

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
@Composable fun VerificationSnippet() {
// #region show
var cameraGranted by rememberSaveable { mutableStateOf(false) }

if (cameraGranted) {
    CameraPicker()
} else {
    Button(onClick = openLibrary) { Text("Choose from library") }
}
// #endregion

}
