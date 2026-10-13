package snippets.refresh_bookmark_races.basic

// #region show
private val feed = MutableStateFlow(FeedState())

suspend fun refresh() {
    val posts = api.loadPosts()
    feed.update { current -> current.copy(posts = posts) }
}
// #endregion
