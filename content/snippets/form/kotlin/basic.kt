package snippets.form.basic

// #region show
@Composable
fun LoginForm(onSubmit: (String) -> Unit) {
    var email by rememberSaveable { mutableStateOf("") }
    val isValid = email.contains("@")

    Button(onClick = { onSubmit(email) }, enabled = isValid) { Text("Continue") }
}
// #endregion
