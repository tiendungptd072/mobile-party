package snippets.lifecycle.production

import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.compose.*
import androidx.lifecycle.viewmodel.compose.viewModel
// #region show
@Composable
fun SessionRoute(viewModel: SessionViewModel = viewModel()) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    SessionScreen(state)
}
// #endregion
