package snippets.global_state.learn_basic

import verification.support.*
import androidx.lifecycle.*
import kotlinx.coroutines.flow.*
// #region show
class ProfileViewModel : ViewModel() {
    private val _state = MutableStateFlow(ProfileUiState())
    val state = _state.asStateFlow()

    fun rename(name: String) {
        _state.update { it.copy(name = name) }
    }
}
// #endregion
