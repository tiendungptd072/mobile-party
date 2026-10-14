package snippets.recipes.pagination

import verification.support.*
import androidx.compose.foundation.lazy.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.paging.*
import androidx.paging.compose.*
@Composable fun VerificationSnippet() {
// #region show
val posts = viewModel.posts.collectAsLazyPagingItems()
LazyColumn {
    items(posts.itemCount) { index ->
        posts[index]?.let { PostRow(it) }
    }
    when (posts.loadState.append) {
        is LoadState.Loading -> item { CircularProgressIndicator() }
        is LoadState.Error -> item { RetryButton(onClick = posts::retry) }
        else -> Unit
    }
}
// #endregion

}
