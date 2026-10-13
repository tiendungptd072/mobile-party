package snippets.text_input.applied

// #region show
@Composable
fun EmailField(value: String, onValueChange: (String) -> Unit) {
    TextField(
        value = value,
        onValueChange = onValueChange,
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
    )
}
// #endregion
