package snippets.props.basic

// #region show
@Composable
fun UserCard(
    name: String,
    onOpen: () -> Unit,
) {
    Button(onClick = onOpen) { Text(name) }
}
// #endregion
