package snippets.form.applied

import verification.support.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
// #region show
@Composable
fun SignInForm(state: SignInUiState, onEvent: (SignInEvent) -> Unit) {
    EmailField(state.email) { onEvent(SignInEvent.EmailChanged(it)) }
    PasswordField(state.password) { onEvent(SignInEvent.PasswordChanged(it)) }
    Button(onClick = { onEvent(SignInEvent.Submit) }, enabled = state.canSubmit) {
        Text("Sign in")
    }
}
// #endregion
