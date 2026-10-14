package snippets.accessibility_semantics.production

import verification.support.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.test.*
@Composable fun VerificationSnippet() {
// #region show
IconButton(onClick = onSave, modifier = Modifier.testTag("profile-save")) {
    Icon(Icons.Default.Save, contentDescription = "Save profile")
}

composeTestRule.onNodeWithTag("profile-save").performClick()
// #endregion

}
