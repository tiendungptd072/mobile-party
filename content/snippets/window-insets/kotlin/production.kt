package snippets.window_insets.production

// #region show
@Composable
fun FeedScreen(posts: List<Post>) {
    Scaffold(topBar = { TopAppBar(title = { Text("Feed") }) }) { contentPadding ->
        LazyColumn(contentPadding = contentPadding) {
            items(posts, key = Post::id) { post -> PostRow(post) }
        }
    }
}
// #endregion
