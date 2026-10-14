package snippets.window_insets.production

import verification.support.*
import androidx.compose.foundation.lazy.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
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
