package snippets.list.applied

import verification.support.*
import androidx.compose.foundation.lazy.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
LazyColumn {
    items(users, key = { it.id }) { user ->
        UserRow(user, onClick = { onSelect(user.id) })
    }
}
// #endregion

}
