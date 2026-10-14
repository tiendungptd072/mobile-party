package snippets.global_state.basic

import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.compose.*
import androidx.lifecycle.viewmodel.compose.viewModel
// #region show
@Composable
fun ProfileRoute(viewModel: ProfileViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    ProfileScreen(uiState, viewModel::signOut)
}
// #endregion
