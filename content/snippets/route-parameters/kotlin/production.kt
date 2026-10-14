package snippets.route_parameters.production

import verification.support.*
import androidx.lifecycle.*
import androidx.navigation.*
import kotlinx.coroutines.flow.*
import verification.support.ProfileState.Loading
// #region show
class ProfileViewModel(
    savedStateHandle: SavedStateHandle,
    repository: ProfileRepository,
) : ViewModel() {
    private val route = savedStateHandle.toRoute<ProfileRoute>()
    val state = repository.observeAuthorized(route.userId)
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), Loading)
}
// #endregion
