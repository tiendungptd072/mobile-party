package snippets.button.production

import verification.support.*
import androidx.lifecycle.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
class VerificationViewModel : ViewModel() {
// #region show
private var saveJob: Job? = null

fun save() {
    if (saveJob?.isActive == true) return
    saveJob = viewModelScope.launch {
        _state.update { it.copy(isSaving = true) }
        try {
            repository.save()
        } catch (cancelled: CancellationException) {
            throw cancelled
        } catch (error: Throwable) {
            _state.update { it.copy(saveError = error.toUiMessage()) }
        } finally {
            _state.update { it.copy(isSaving = false) }
        }
    }
}
// #endregion

}
