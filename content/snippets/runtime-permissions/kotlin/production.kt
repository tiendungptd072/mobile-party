package snippets.runtime_permissions.production

// #region show
@Composable
fun CameraEducation(onRequest: () -> Unit) {
    Button(onClick = onRequest) { Text("Allow camera to scan a receipt") }
}
// #endregion
