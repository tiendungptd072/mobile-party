package snippets.derived_state.production

// #region show
@Composable
fun Feed(posts: List<Post>) {
    val listState = rememberLazyListState()
    val showTop by remember {
        derivedStateOf { listState.firstVisibleItemIndex > 0 }
    }

    LazyColumn(state = listState) {
        items(posts, key = { it.id }) { PostRow(it) }
    }
    AnimatedVisibility(showTop) { ScrollToTopButton() }
}
// #endregion
