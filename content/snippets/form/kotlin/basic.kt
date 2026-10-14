package snippets.form.basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
// #region show
@Composable
fun LoginForm(onSubmit: (String) -> Unit) {
    var email by rememberSaveable { mutableStateOf("") }
    val isValid = email.contains("@")

    Button(onClick = { onSubmit(email) }, enabled = isValid) { Text("Continue") }
}
// #endregion
