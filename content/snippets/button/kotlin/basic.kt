package snippets.button.basic

// #region show
@Composable
fun SaveButton(saving: Boolean, onSave: () -> Unit) {
  Button(onClick = onSave, enabled = !saving) {
    Text(if (saving) "Saving…" else "Save")
  }
}
// #endregion
