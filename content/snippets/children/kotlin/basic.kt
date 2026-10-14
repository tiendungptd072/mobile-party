package snippets.children.basic

import verification.support.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.unit.*
@Composable fun VerificationSnippet() {
// #region show
@Composable
fun Panel(content: @Composable () -> Unit) {
    Surface(shape = RoundedCornerShape(12.dp)) { content() }
}

Panel { Text("Profile") }
// #endregion
}
