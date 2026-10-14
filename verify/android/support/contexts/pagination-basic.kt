package snippets.pagination.basic
import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.*
data class PagingState(val items: List<Post>, val isAppending: Boolean, val nearEnd: Boolean, val canLoadMore: Boolean); val state = PagingState(emptyList(), false, false, false); val viewModel = FeedViewModel()
