package snippets.async.production

// #region show
class ProfileViewModel(
    savedStateHandle: SavedStateHandle,
    repository: ProfileRepository,
) : ViewModel() {
    private val profileId = savedStateHandle.getStateFlow("profileId", "")

    val state = profileId.filter(String::isNotBlank).flatMapLatest { id ->
        repository.observeProfile(id)
            .map<Profile, ProfileUiState> { Ready(it) }
            .catch { emit(Error) }
    }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), Loading)
}
// #endregion
