package snippets.text_input.learn_basic

// #region show
@Composable
fun NameField() {
    var name by rememberSaveable { mutableStateOf("") }
    TextField(value = name, onValueChange = { name = it })
}
// #endregion
