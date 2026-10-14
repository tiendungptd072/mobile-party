package snippets.error_handling.production

import verification.support.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
// #region show
suspend fun load(): ProfileUiState = try {
    ProfileUiState.Ready(repository.load())
} catch (cancelled: CancellationException) {
    throw cancelled
} catch (error: Throwable) {
    ProfileUiState.Error(error.toProfileError())
}
// #endregion
