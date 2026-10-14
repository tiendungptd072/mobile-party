package snippets.list.learn_basic

import verification.support.*
import androidx.compose.foundation.lazy.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
LazyColumn {
    items(users) { user -> UserRow(user) }
}
// #endregion

}
