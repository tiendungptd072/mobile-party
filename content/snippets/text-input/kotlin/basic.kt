package snippets.text_input.basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
@Composable fun VerificationSnippet() {
// #region show
TextField(value = name, onValueChange = { name = it }, label = { Text("Name") })
// #endregion

}
