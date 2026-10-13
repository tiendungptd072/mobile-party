package snippets.form.applied

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
