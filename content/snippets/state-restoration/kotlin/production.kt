package snippets.state_restoration.production

import verification.support.*
import androidx.lifecycle.*
import kotlinx.coroutines.flow.*
// #region show
class ProfileViewModel(
    savedStateHandle: SavedStateHandle,
    repository: ProfileRepository,
) : ViewModel() {
    private val id: String = checkNotNull(savedStateHandle["userId"])
    val profile = repository.observeProfile(id)
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), null)
}
// #endregion
