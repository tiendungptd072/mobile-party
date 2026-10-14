package snippets.horizontal_layout.learn_basic

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.unit.*
@Composable fun VerificationSnippet() {
// #region show
Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    Icon()
    Text("Label")
}
// #endregion

}
