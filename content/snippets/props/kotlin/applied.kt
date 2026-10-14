package snippets.props.applied

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
@Composable
fun UserRow(user: User, onSelect: (String) -> Unit) {
    TextButton(onClick = { onSelect(user.id) }) { Text(user.name) }
}
// #endregion
