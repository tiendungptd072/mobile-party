package snippets.children.applied

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
// #region show
@Composable
fun Panel(
    header: @Composable () -> Unit,
    content: @Composable () -> Unit,
    actions: @Composable () -> Unit,
) {
    Column {
        header()
        content()
        Row { actions() }
    }
}
// #endregion
