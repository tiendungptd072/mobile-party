package snippets.text_input.production

// #region show
@Composable
fun EmailField(value: String, error: String?, onValueChange: (String) -> Unit) {
    TextField(
        value = value,
        onValueChange = onValueChange,
        isError = error != null,
        supportingText = { error?.let { Text(it) } },
        label = { Text("Email") },
    )
}
// #endregion
