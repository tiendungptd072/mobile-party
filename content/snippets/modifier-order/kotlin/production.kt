package snippets.modifier_order.production

import verification.support.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.*
@Composable fun VerificationSnippet() {
// #region show
Box(Modifier.clickable(onClick = onOpen).padding(16.dp)) {
    Text("Open profile")
}
// #endregion

}
