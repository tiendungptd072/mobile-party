package snippets.horizontal_layout.applied

// #region show
Row(verticalAlignment = Alignment.CenterVertically) {
    Avatar()
    Text(name, Modifier.weight(1f))
    MoreButton()
}
// #endregion
