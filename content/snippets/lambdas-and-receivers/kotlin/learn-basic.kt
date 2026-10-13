package snippets.lambdas_and_receivers.learn_basic

// #region show
typealias OnSelect = (String) -> Unit

@Composable
fun UserRow(user: User, onSelect: OnSelect) {
    Row(Modifier.clickable { onSelect(user.id) }) { Text(user.name) }
}
// #endregion
