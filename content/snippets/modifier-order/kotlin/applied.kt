package snippets.modifier_order.applied

import verification.support.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.*
@Composable fun VerificationSnippet() {
// #region show
Box(Modifier.padding(16.dp).background(Color(0xFFDBEAFE))) {
    Text("Profile")
}
// #endregion

}
