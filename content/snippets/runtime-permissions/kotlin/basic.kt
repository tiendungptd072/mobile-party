package snippets.runtime_permissions.basic

import verification.support.*
import android.Manifest
import androidx.activity.compose.*
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.material3.*
import androidx.compose.runtime.*
import kotlinx.coroutines.*
@Composable fun VerificationSnippet() {
// #region show
val requestCamera = rememberLauncherForActivityResult(
    ActivityResultContracts.RequestPermission(),
) { granted -> if (granted) openCamera() }

Button(onClick = { requestCamera.launch(Manifest.permission.CAMERA) }) {
    Text("Use camera")
}
// #endregion

}
