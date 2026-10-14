package snippets.layout.learn_basic

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
@Composable fun VerificationSnippet() {
// #region show
Row(verticalAlignment = Alignment.CenterVertically) {
    Avatar()
    Column { Text("Name"); Text("Role") }
}
// #endregion

}
