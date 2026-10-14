package snippets.state_owner_testing.basic
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
data class FeedUiState(val items: List<Post>); class FeedViewModel(repository: FakeFeedRepository) : ViewModel() { val uiState = MutableStateFlow(FeedUiState(emptyList())) }
