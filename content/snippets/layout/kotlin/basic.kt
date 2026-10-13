package snippets.layout.basic

// #region show
Row(verticalAlignment = Alignment.CenterVertically) {
    Avatar()
    Spacer(Modifier.width(12.dp))
    Text(name)
}
// #endregion
