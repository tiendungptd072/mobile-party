package snippets.ui_identity.learn_basic

import verification.support.*
import androidx.compose.foundation.lazy.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
LazyColumn {
    items(posts, key = { it.id }) { post -> PostRow(post) }
}
// #endregion

}
