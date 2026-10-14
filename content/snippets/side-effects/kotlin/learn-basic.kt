package snippets.side_effects.learn_basic

import verification.support.*
import androidx.compose.runtime.*
import kotlinx.coroutines.*
@Composable fun VerificationSnippet() {
// #region show
LaunchedEffect(query, onSearch) {
    if (query.isBlank()) return@LaunchedEffect
    delay(300)
    onSearch(query)
}
// #endregion

}
