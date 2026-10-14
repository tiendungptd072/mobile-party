package snippets.conditional_ui.learn_basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
if (isLoading) CircularProgressIndicator() else ProfileCard(profile)
// #endregion

}
