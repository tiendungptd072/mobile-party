package snippets.runtime_permissions.production

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
@Composable
fun CameraEducation(onRequest: () -> Unit) {
    Button(onClick = onRequest) { Text("Allow camera to scan a receipt") }
}
// #endregion
