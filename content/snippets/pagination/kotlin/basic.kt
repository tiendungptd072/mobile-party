package snippets.pagination.basic

// #region show
LazyColumn {
  items(state.items, key = { it.id }) { item -> FeedRow(item) }
  if (state.isAppending) item { CircularProgressIndicator() }
}

LaunchedEffect(state.nearEnd, state.canLoadMore) {
  if (state.nearEnd && state.canLoadMore) viewModel.loadMore()
}
// #endregion
