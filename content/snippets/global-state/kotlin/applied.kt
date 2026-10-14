package snippets.global_state.applied

import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.compose.*
import androidx.lifecycle.viewmodel.compose.viewModel
// #region show
@Composable
fun ProfileRoute(viewModel: ProfileViewModel = viewModel()) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    ProfileScreen(state = state, onRename = viewModel::rename)
}

@Composable
fun ProfileScreen(state: ProfileUiState, onRename: (String) -> Unit) {
    ProfileForm(name = state.name, onRename = onRename)
}
// #endregion
