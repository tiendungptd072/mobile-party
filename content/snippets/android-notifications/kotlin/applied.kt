package snippets.android_notifications.applied

// #region show
val launcher = rememberLauncherForActivityResult(
    ActivityResultContracts.RequestPermission(),
) { granted -> onPermissionResult(granted) }
Button(onClick = {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        launcher.launch(Manifest.permission.POST_NOTIFICATIONS)
    } else onPermissionResult(true)
}) { Text(stringResource(R.string.enable_reminders)) }
// #endregion
