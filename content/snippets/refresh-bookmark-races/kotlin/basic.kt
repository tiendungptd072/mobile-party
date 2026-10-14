package snippets.refresh_bookmark_races.basic

import verification.support.*
import kotlinx.coroutines.flow.*
// #region show
private val feed = MutableStateFlow(FeedState())

suspend fun refresh() {
    val posts = api.loadPosts()
    feed.update { current -> current.copy(posts = posts) }
}
// #endregion
