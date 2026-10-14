package snippets.flow_and_stateflow.basic

import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.compose.*
// #region show
@Composable
fun FeedRoute(viewModel: FeedViewModel) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    FeedScreen(state)
}
// #endregion
