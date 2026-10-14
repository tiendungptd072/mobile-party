package snippets.lambdas_and_receivers.learn_basic

import verification.support.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
// #region show
typealias OnSelect = (String) -> Unit

@Composable
fun UserRow(user: User, onSelect: OnSelect) {
    Row(Modifier.clickable { onSelect(user.id) }) { Text(user.name) }
}
// #endregion
