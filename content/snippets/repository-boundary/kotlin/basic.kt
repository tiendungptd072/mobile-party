package snippets.repository_boundary.basic

import verification.support.*
import androidx.lifecycle.*
import kotlinx.coroutines.*
// #region show
class ProfileViewModel(
    private val repository: ProfileRepository,
) : ViewModel() {
    fun load(id: String) = viewModelScope.launch {
        _uiState.value = ProfileUiState.Ready(repository.getProfile(id))
    }
}
// #endregion
