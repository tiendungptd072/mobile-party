package snippets.window_insets.applied

// #region show
Column(Modifier.fillMaxSize().imePadding()) {
    MessageList(Modifier.weight(1f))
    TextField(value = draft, onValueChange = onDraftChange)
}
// #endregion
