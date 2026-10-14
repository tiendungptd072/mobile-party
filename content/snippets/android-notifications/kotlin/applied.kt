package snippets.android_notifications.applied

import verification.support.*
import android.Manifest
import android.os.*
import androidx.activity.compose.*
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.res.*
import kotlinx.coroutines.*
import party.mobile.verification.R
@Composable fun VerificationSnippet() {
// #region show
val launcher = rememberLauncherForActivityResult(
    ActivityResultContracts.RequestPermission(),
) { granted -> onPermissionResult(granted) }
Button(onClick = {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        launcher.launch(Manifest.permission.POST_NOTIFICATIONS)
    } else onPermissionResult(true)
}) { Text(stringResource(R.string.enable_reminders)) }
// #endregion

}
