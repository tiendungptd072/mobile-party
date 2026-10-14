package snippets.theme.applied

import verification.support.*
import androidx.compose.foundation.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
val useDarkColors = when (preference) {
    ThemePreference.System -> isSystemInDarkTheme()
    ThemePreference.Dark -> true
    ThemePreference.Light -> false
}
// #endregion

}
