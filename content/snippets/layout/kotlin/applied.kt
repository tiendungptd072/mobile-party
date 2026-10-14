package snippets.layout.applied

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.Alignment
@Composable fun VerificationSnippet() {
// #region show
Row(verticalAlignment = Alignment.CenterVertically) {
    Avatar()
    Text(name, Modifier.weight(1f))
    IconButton(onClick = onMore) { MoreIcon() }
}
// #endregion

}
