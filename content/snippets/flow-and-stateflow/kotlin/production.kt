package snippets.flow_and_stateflow.production

import verification.support.*
import androidx.lifecycle.*
import kotlinx.coroutines.flow.*
import java.io.IOException
class VerificationViewModel : ViewModel() {
// #region show
val uiState: StateFlow<FeedUiState> = repository.posts
    .map<List<Post>, FeedUiState> { posts -> FeedUiState.Ready(posts) }
    .catch { error ->
        if (error is IOException) emit(FeedUiState.Error)
        else throw error
    }
    .stateIn(
        viewModelScope,
        SharingStarted.WhileSubscribed(5_000),
        FeedUiState.Loading,
    )
// #endregion

}
