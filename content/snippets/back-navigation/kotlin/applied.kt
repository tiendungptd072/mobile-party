package snippets.back_navigation.applied

// #region show
if (showDiscardDialog) {
    AlertDialog(
        onDismissRequest = { showDiscardDialog = false },
        confirmButton = { TextButton(onClick = navController::popBackStack) { Text("Discard") } },
        dismissButton = { TextButton(onClick = { showDiscardDialog = false }) { Text("Keep editing") },
    )
}
// #endregion
