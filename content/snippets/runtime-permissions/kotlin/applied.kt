package snippets.runtime_permissions.applied

// #region show
var cameraGranted by rememberSaveable { mutableStateOf(false) }

if (cameraGranted) {
    CameraPicker()
} else {
    Button(onClick = openLibrary) { Text("Choose from library") }
}
// #endregion
