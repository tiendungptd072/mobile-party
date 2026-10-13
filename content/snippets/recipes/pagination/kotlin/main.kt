package snippets.recipes.pagination

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
