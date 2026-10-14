package snippets.refresh_bookmark_races.learn_basic

import verification.support.*
import kotlinx.coroutines.flow.*
// #region show
data class Post(val id: String, val title: String)
data class FeedState(
    val posts: List<Post> = emptyList(),
    val bookmarkedIds: Set<String> = emptySet(),
)
data class VisiblePost(val post: Post, val bookmarked: Boolean)

fun visiblePosts(state: FeedState) = state.posts.map { post ->
    VisiblePost(post, post.id in state.bookmarkedIds)
}
// #endregion
