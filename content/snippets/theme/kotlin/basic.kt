package snippets.theme.basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
@Composable
fun AppTheme(darkTheme: Boolean, content: @Composable () -> Unit) {
  MaterialTheme(
    colorScheme = if (darkTheme) darkColorScheme() else lightColorScheme(),
    content = content,
  )
}
// #endregion
