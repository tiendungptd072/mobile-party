package snippets.horizontal_layout.basic

// #region show
Row(verticalAlignment = Alignment.CenterVertically) {
  Avatar(user)
  Spacer(Modifier.width(12.dp))
  Text(user.name, Modifier.weight(1f))
  IconButton(onClick = onMore) { Icon(Icons.Default.MoreVert, null) }
}
// #endregion
