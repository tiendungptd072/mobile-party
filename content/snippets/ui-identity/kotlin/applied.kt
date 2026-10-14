package snippets.ui_identity.applied

import verification.support.*
import androidx.compose.foundation.lazy.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
val sorted = posts.sortedByDescending(Post::createdAt)
LazyColumn {
    items(sorted, key = { it.id }) { post -> EditablePost(post) }
}
// #endregion

}
