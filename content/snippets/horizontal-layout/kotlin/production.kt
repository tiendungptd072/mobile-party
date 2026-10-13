package snippets.horizontal_layout.production

// #region show
Row(verticalAlignment = Alignment.CenterVertically) {
    Text(title, Modifier.weight(1f), maxLines = 2, overflow = TextOverflow.Ellipsis)
    Button(onClick = onOpen) { Text("Open") }
}
// #endregion
