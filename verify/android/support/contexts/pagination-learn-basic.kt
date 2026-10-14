package snippets.pagination.learn_basic
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
sealed interface AppendState { data object Idle : AppendState; data object Loading : AppendState; data class Error(val cause: Throwable) : AppendState }; data class AppendFeedState(val items: List<Post> = emptyList(), val nextCursor: String? = null, val append: AppendState = AppendState.Idle) { fun append(page: Page) = copy(items = items + page.items, nextCursor = page.nextCursor, append = AppendState.Idle) }; val _state = MutableStateFlow(AppendFeedState()); val state = _state.asStateFlow()
