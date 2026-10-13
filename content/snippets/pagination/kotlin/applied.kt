package snippets.pagination.applied

// #region show
data class FeedUiState(
    val items: List<Post> = emptyList(),
    val nextCursor: String? = null,
    val append: AppendState = AppendState.Idle,
)

LazyColumn {
    items(state.items, key = { it.id }) { PostRow(it) }
    item { AppendState(state.append) }
}
// #endregion
