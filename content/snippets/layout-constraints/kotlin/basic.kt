package snippets.layout_constraints.basic

import verification.support.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.*
@Composable fun VerificationSnippet() {
// #region show
Column(Modifier.fillMaxWidth().padding(horizontal = 16.dp)) {
    Box(Modifier.fillMaxWidth().height(80.dp).background(Color(0xFFDBEAFE)))
}
// #endregion

}
