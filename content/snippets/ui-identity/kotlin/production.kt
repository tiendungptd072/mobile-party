package snippets.ui_identity.production

// #region show
@Composable
fun Editor(selected: Item) {
    key(selected.id) { DraftEditor(selected) }
}
// #endregion
