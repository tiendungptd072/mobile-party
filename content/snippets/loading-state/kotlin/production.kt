package snippets.loading_state.production

import verification.support.*
import androidx.compose.material3.pulltorefresh.PullToRefreshBox
import androidx.compose.runtime.*
// #region show
data class FeedUiState(
    val items: List<Post> = emptyList(),
    val isRefreshing: Boolean = false,
)

@Composable
fun FeedContent(state: FeedUiState, onRefresh: () -> Unit) {
    PullToRefreshBox(isRefreshing = state.isRefreshing, onRefresh = onRefresh) {
        FeedList(state.items)
    }
}
// #endregion
