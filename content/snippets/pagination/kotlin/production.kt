package snippets.pagination.production

// #region show
val posts = Pager(PagingConfig(pageSize = 20)) {
    FeedPagingSource(api)
}.flow.cachedIn(viewModelScope)

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
// #endregion
