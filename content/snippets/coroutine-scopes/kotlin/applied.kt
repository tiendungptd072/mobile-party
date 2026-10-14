package snippets.coroutine_scopes.applied

import verification.support.*
import androidx.compose.runtime.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
@Composable fun VerificationSnippet() {
// #region show
var items by remember(query) { mutableStateOf<List<Item>>(emptyList()) }
var hasError by remember(query) { mutableStateOf(false) }
LaunchedEffect(query) {
    hasError = false
    try {
        items = repository.search(query)
    } catch (cancelled: CancellationException) {
        throw cancelled
    } catch (_: Exception) {
        hasError = true
    }
}
// #endregion

}
