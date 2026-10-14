package snippets.pagination.production

import verification.support.*
import androidx.compose.foundation.lazy.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.lifecycle.*
import androidx.paging.*
import androidx.paging.compose.*
import kotlinx.coroutines.flow.*
// #region show
class FeedViewModel : ViewModel() {
    val posts = Pager(PagingConfig(pageSize = 20)) {
        FeedPagingSource(api)
    }.flow.cachedIn(viewModelScope)
}

@Composable
fun FeedScreen(viewModel: FeedViewModel) {
    val posts = viewModel.posts.collectAsLazyPagingItems()
    LazyColumn {
        items(
            count = posts.itemCount,
            key = posts.itemKey { it.id },
        ) { index -> posts[index]?.let { PostRow(it) } }
        when (val append = posts.loadState.append) {
            is LoadState.Loading -> item { CircularProgressIndicator() }
            is LoadState.Error -> item { RetryRow(append.error, posts::retry) }
            else -> Unit
        }
    }
}
// #endregion
