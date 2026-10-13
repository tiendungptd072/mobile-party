package snippets.button.applied

// #region show
@Composable
fun SaveButton(isSaving: Boolean, canSave: Boolean, onSave: () -> Unit) {
    Button(onClick = onSave, enabled = canSave && !isSaving) {
        Text(if (isSaving) "Saving…" else "Save")
    }
}
// #endregion
