package snippets.props.production

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.Alignment
import coil3.compose.AsyncImage
// #region show
@Composable
fun ProfileHeader(
    displayName: String,
    avatarUrl: String?,
    onEdit: () -> Unit,
) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        avatarUrl?.let { AsyncImage(model = it, contentDescription = null) }
        Text(displayName, modifier = Modifier.weight(1f))
        TextButton(onClick = onEdit) { Text("Edit") }
    }
}
// #endregion
