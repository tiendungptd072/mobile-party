package snippets.button.learn_basic

// #region show
@Composable
fun SaveButton(onSave: () -> Unit) {
    Button(onClick = onSave) { Text("Save") }
}
// #endregion
