package snippets.vertical_layout.learn_basic

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.unit.*
@Composable fun VerificationSnippet() {
// #region show
Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    Text("Title")
    Text("Subtitle")
}
// #endregion

}
