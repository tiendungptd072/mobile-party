package snippets.vertical_layout.basic

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.unit.*
@Composable fun VerificationSnippet() {
// #region show
Column(
  verticalArrangement = Arrangement.spacedBy(12.dp),
  horizontalAlignment = Alignment.CenterHorizontally,
) {
  Avatar(user)
  Text(user.name)
}
// #endregion

}
