package snippets.pagination.applied

import verification.support.*
import androidx.compose.foundation.lazy.*
import androidx.compose.runtime.*
// #region show
data class FeedUiState(
    val items: List<Post> = emptyList(),
    val nextCursor: String? = null,
    val append: AppendState = AppendState.Idle,
)

@Composable
fun FeedContent(state: FeedUiState) {
    LazyColumn {
        items(state.items, key = { it.id }) { PostRow(it) }
        item { AppendState(state.append) }
    }
}
// #endregion
