package snippets.android_activity_lifecycle.production

import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.compose.*
// #region show
@Composable
fun ItemsRoute(viewModel: ItemsViewModel) {
    val items by viewModel.items.collectAsStateWithLifecycle()
    ItemsScreen(items = items)
}
// #endregion
