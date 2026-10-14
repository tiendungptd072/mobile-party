package snippets.list.production

import verification.support.*
import androidx.compose.foundation.lazy.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
if (items.isEmpty()) EmptyView(onRetry)
else LazyColumn { items(items, key = { it.id }) { item -> ItemRow(item) } }
// #endregion

}
