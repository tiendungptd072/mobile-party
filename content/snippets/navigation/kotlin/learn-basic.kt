package snippets.navigation.learn_basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.navigation.compose.*
@Composable fun VerificationSnippet() {
// #region show
Button(onClick = { navController.navigate("profile") }) {
    Text("Open profile")
}
// #endregion

}
