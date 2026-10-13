package snippets.form.learn_basic

// #region show
@Composable
fun SignInForm(onSubmit: (String) -> Unit) {
    var email by rememberSaveable { mutableStateOf("") }
    val isValid = "@" in email

    EmailField(email, onValueChange = { email = it })
    Button(onClick = { onSubmit(email) }, enabled = isValid) { Text("Continue") }
}
// #endregion
