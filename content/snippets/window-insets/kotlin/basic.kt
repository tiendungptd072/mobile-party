package snippets.window_insets.basic

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
// #region show
@Composable
fun ProfileScreen() {
    Box(Modifier.fillMaxSize().safeDrawingPadding()) {
        Profile()
    }
}
// #endregion
