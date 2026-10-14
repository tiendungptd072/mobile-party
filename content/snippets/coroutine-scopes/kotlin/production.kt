package snippets.coroutine_scopes.production

import verification.support.*
import androidx.lifecycle.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
private val _state = MutableStateFlow<ProfileState>(ProfileState.Loading)
class VerificationViewModel : ViewModel() {
// #region show
private var loadJob: Job? = null

fun reload() {
    loadJob?.cancel()
    loadJob = viewModelScope.launch {
        _state.value = ProfileState.Loading
        try {
            _state.value = ProfileState.Ready(repository.load())
        } catch (cancelled: CancellationException) {
            throw cancelled
        } catch (error: Exception) {
            _state.value = ProfileState.Error
        }
    }
}
// #endregion

}
