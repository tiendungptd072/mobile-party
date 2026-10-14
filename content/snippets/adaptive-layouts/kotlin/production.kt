package snippets.adaptive_layouts.production

import verification.support.*
import androidx.compose.runtime.*
import androidx.lifecycle.compose.*
import androidx.lifecycle.viewmodel.compose.viewModel
// #region show
@Composable
fun MailRoute(viewModel: MailViewModel = viewModel()) {
    val selectedId by viewModel.selectedId.collectAsStateWithLifecycle()
    MailScreen(selectedId = selectedId)
}
// #endregion
