package snippets.stability_and_skipping.applied

import verification.support.*
import androidx.compose.foundation.lazy.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
LazyColumn {
    items(users, key = { it.id }) { user ->
        UserRow(name = user.name)
    }
}
// #endregion

}
