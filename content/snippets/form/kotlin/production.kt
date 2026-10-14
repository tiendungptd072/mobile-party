package snippets.form.production

import verification.support.*
import androidx.lifecycle.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
class VerificationViewModel : ViewModel() {
// #region show
fun submit() {
    val current = state.value
    if (!current.canSubmit || current.isSubmitting) return
    viewModelScope.launch {
        _state.update { it.copy(isSubmitting = true, serverError = null) }
        try {
            auth.signIn(current.email, current.password)
            _state.update { it.copy(isSignedIn = true) }
        } catch (cancelled: CancellationException) {
            throw cancelled
        } catch (error: Throwable) {
            _state.update { it.copy(serverError = error.toUiMessage()) }
        } finally {
            _state.update { it.copy(isSubmitting = false) }
        }
    }
}
// #endregion

}
