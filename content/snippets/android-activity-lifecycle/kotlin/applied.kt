package snippets.android_activity_lifecycle.applied

import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.compose.*
@Composable fun VerificationSnippet() {
// #region show
LifecycleResumeEffect(camera) {
    camera.startPreview()
    onPauseOrDispose { camera.stopPreview() }
}
// #endregion

}
