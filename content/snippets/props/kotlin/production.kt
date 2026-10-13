package snippets.props.production

// #region show
@Composable
fun ProfileHeader(
    displayName: String,
    avatarUrl: String?,
    onEdit: () -> Unit,
) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        avatarUrl?.let { AsyncImage(model = it, contentDescription = null) }
        Text(displayName, modifier = Modifier.weight(1f))
        TextButton(onClick = onEdit) { Text("Edit") }
    }
}
// #endregion
