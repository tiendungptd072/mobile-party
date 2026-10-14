package snippets.children.production

import verification.support.*
import androidx.compose.foundation.lazy.*
import androidx.compose.runtime.*
// #region show
@Composable
fun FeedList(
    posts: List<Post>,
    renderPost: @Composable LazyItemScope.(Post, Int) -> Unit,
) {
    LazyColumn {
        itemsIndexed(posts, key = { _, post -> post.id }) { index, post ->
            renderPost(post, index)
        }
    }
}
// #endregion
