package snippets.vertical_layout.production

import verification.support.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.*
@Composable fun VerificationSnippet() {
// #region show
Column(Modifier.verticalScroll(rememberScrollState()).padding(16.dp)) {
    ProfileHeader()
    ProfileDetails()
}
// #endregion

}
