package snippets.props.basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
@Composable
fun UserCard(
    name: String,
    onOpen: () -> Unit,
) {
    Button(onClick = onOpen) { Text(name) }
}
// #endregion
