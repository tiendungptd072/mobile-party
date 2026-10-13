package snippets.loading_state.production

// #region show
data class FeedUiState(
    val items: List<Post> = emptyList(),
    val isRefreshing: Boolean = false,
)

PullToRefreshBox(isRefreshing = state.isRefreshing, onRefresh = onRefresh) {
    FeedList(state.items)
}
// #endregion
