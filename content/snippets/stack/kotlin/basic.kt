package snippets.stack.basic

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.Alignment
@Composable fun VerificationSnippet() {
// #region show
Box {
  Avatar(user)
  OnlineBadge(Modifier.align(Alignment.BottomEnd))
}
// #endregion

}
