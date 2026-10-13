package snippets.repository_boundary.basic

// #region show
class ProfileViewModel(
    private val repository: ProfileRepository,
) : ViewModel() {
    fun load(id: String) = viewModelScope.launch {
        _uiState.value = ProfileUiState.Ready(repository.getProfile(id))
    }
}
// #endregion
