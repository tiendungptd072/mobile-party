package snippets.horizontal_layout.production

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.Alignment
import androidx.compose.ui.text.style.TextOverflow
@Composable fun VerificationSnippet() {
// #region show
Row(verticalAlignment = Alignment.CenterVertically) {
    Text(title, Modifier.weight(1f), maxLines = 2, overflow = TextOverflow.Ellipsis)
    Button(onClick = onOpen) { Text("Open") }
}
// #endregion

}
