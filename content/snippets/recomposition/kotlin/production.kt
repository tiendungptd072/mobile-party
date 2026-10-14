package snippets.recomposition.production

import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.compose.*
import androidx.lifecycle.viewmodel.compose.viewModel
// #region show
@Composable
fun ProfileRoute(viewModel: ProfileViewModel = viewModel()) {
    val profile by viewModel.profile.collectAsStateWithLifecycle()
    ProfileScreen(profile)
}
// #endregion
