package snippets.state_driven_animation.applied

import verification.support.*
import androidx.compose.animation.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
AnimatedVisibility(visible = showFilters) {
    Filters()
}
// #endregion

}
