package snippets.async.applied

import verification.support.*
import androidx.compose.runtime.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
@Composable fun VerificationSnippet() {
// #region show
LaunchedEffect(userId) {
    try {
        user = repository.getUser(userId)
    } catch (cancelled: CancellationException) {
        throw cancelled
    } catch (error: Exception) {
        reportError(error)
    }
}
// A changed key cancels the previous coroutine.
// #endregion

}
