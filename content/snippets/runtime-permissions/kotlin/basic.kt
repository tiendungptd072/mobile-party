package snippets.runtime_permissions.basic

// #region show
val requestCamera = rememberLauncherForActivityResult(
    ActivityResultContracts.RequestPermission(),
) { granted -> if (granted) openCamera() }

Button(onClick = { requestCamera.launch(Manifest.permission.CAMERA) }) {
    Text("Use camera")
}
// #endregion
