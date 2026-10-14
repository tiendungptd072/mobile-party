package snippets.vertical_layout.applied

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.unit.*
@Composable fun VerificationSnippet() {
// #region show
Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(12.dp)) {
    Avatar()
    Text(name)
}
// #endregion

}
