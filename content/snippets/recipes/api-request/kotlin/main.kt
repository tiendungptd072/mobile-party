package snippets.recipes.api_request

// #region show
fun loadProfile() = viewModelScope.launch {
    uiState.value = ProfileState.Loading
    try {
        uiState.value = ProfileState.Success(repository.profile())
    } catch (cancelled: CancellationException) {
        throw cancelled
    } catch (error: Exception) {
        uiState.value = ProfileState.Error("Could not load profile")
    }
}
// #endregion
