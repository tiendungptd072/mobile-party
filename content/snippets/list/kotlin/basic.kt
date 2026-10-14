package snippets.list.basic

import verification.support.*
import androidx.compose.foundation.lazy.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
LazyColumn {
    items(
        items = users,
        key = { user -> user.id },
    ) { user ->
        UserRow(user = user)
    }
}
// #endregion

}
