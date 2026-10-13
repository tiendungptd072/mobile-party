package snippets.state_restoration.production

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
