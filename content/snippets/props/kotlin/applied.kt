package snippets.props.applied

// #region show
@Composable
fun UserRow(user: User, onSelect: (String) -> Unit) {
    TextButton(onClick = { onSelect(user.id) }) { Text(user.name) }
}
// #endregion
