package snippets.offline_first_data.basic

// #region show
class FeedViewModel(repository: FeedRepository) : ViewModel() {
    val feed = repository.observeFeed()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    init { viewModelScope.launch { repository.refresh() } }
}
// #endregion
