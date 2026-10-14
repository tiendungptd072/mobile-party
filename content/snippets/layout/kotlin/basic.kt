package snippets.layout.basic

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.Alignment
import androidx.compose.ui.unit.*
@Composable fun VerificationSnippet() {
// #region show
Row(verticalAlignment = Alignment.CenterVertically) {
    Avatar()
    Spacer(Modifier.width(12.dp))
    Text(name)
}
// #endregion

}
