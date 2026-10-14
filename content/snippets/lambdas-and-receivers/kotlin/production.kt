package snippets.lambdas_and_receivers.production

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
// #region show
@Composable
fun ActionBar(
    actions: @Composable RowScope.(enabled: Boolean) -> Unit,
) {
    Row { actions(true) }
}
// #endregion
