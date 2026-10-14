package snippets.form.learn_basic

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
// #region show
@Composable
fun SignInForm(onSubmit: (String) -> Unit) {
    var email by rememberSaveable { mutableStateOf("") }
    val isValid = "@" in email

    EmailField(email, onValueChange = { email = it })
    Button(onClick = { onSubmit(email) }, enabled = isValid) { Text("Continue") }
}
// #endregion
