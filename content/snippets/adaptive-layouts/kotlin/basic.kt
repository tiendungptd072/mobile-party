package snippets.adaptive_layouts.basic

import verification.support.*
import androidx.compose.material3.adaptive.currentWindowAdaptiveInfo
import androidx.compose.runtime.*
import androidx.window.core.layout.WindowSizeClass
// #region show
@Composable
fun MailScreen() {
    val sizeClass = currentWindowAdaptiveInfo().windowSizeClass
    if (sizeClass.isWidthAtLeastBreakpoint(WindowSizeClass.WIDTH_DP_MEDIUM_LOWER_BOUND)) {
        TwoPaneMail()
    } else {
        SinglePaneMail()
    }
}
// #endregion
