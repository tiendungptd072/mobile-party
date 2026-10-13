package snippets.vertical_layout.basic

// #region show
Column(
  verticalArrangement = Arrangement.spacedBy(12.dp),
  horizontalAlignment = Alignment.CenterHorizontally,
) {
  Avatar(user)
  Text(user.name)
}
// #endregion
