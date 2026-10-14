package snippets.coroutine_scopes.basic

import verification.support.*
import androidx.compose.runtime.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
@Composable fun VerificationSnippet() {
// #region show
var user by remember(userId) { mutableStateOf<User?>(null) }
var hasError by remember(userId) { mutableStateOf(false) }
LaunchedEffect(userId) {
    hasError = false
    try {
        user = repository.loadUser(userId)
    } catch (cancelled: CancellationException) {
        throw cancelled
    } catch (_: Exception) {
        hasError = true
    }
}
// #endregion

}
