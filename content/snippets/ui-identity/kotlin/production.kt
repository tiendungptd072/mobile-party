package snippets.ui_identity.production

import verification.support.*
import androidx.compose.runtime.*
// #region show
@Composable
fun Editor(selected: Item) {
    key(selected.id) { DraftEditor(selected) }
}
// #endregion
