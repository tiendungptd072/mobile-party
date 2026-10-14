package snippets.layout_constraints.production

import verification.support.*
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.Alignment
import androidx.compose.ui.unit.*
@Composable fun VerificationSnippet() {
// #region show
Box(Modifier.fillMaxWidth(), contentAlignment = Alignment.TopCenter) {
    Box(Modifier.widthIn(max = 480.dp).fillMaxWidth()) {
        ProfileContent()
    }
}
// #endregion

}
