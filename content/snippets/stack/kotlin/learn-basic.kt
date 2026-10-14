package snippets.stack.learn_basic

import verification.support.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.Alignment
@Composable fun VerificationSnippet() {
// #region show
Box {
    Image(painter, contentDescription = null)
    Text("New", Modifier.align(Alignment.TopEnd))
}
// #endregion

}
