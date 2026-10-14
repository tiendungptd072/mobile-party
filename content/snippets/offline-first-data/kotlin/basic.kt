package snippets.offline_first_data.basic

import verification.support.*
import androidx.lifecycle.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
// #region show
class FeedViewModel(repository: FeedRepository) : ViewModel() {
    val feed = repository.observeFeed()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    init { viewModelScope.launch { repository.refresh() } }
}
// #endregion
