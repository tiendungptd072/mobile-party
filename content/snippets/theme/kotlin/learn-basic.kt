package snippets.theme.learn_basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
MaterialTheme(colorScheme = lightColorScheme()) {
    AppNavigation()
}
// #endregion

}
