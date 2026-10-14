package snippets.pagination.basic

import verification.support.*
import androidx.compose.foundation.lazy.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
LazyColumn {
  items(state.items, key = { it.id }) { item -> FeedRow(item) }
  if (state.isAppending) item { CircularProgressIndicator() }
}

LaunchedEffect(state.nearEnd, state.canLoadMore) {
  if (state.nearEnd && state.canLoadMore) viewModel.loadMore()
}
// #endregion

}
