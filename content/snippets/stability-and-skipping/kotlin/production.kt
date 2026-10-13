package snippets.stability_and_skipping.production

// #region show
@Composable
fun UserRow(name: String, onOpen: () -> Unit) {
    TextButton(onClick = onOpen) { Text(name) }
}
// #endregion
