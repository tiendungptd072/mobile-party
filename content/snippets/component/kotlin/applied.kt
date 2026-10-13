package snippets.component.applied

// #region show
@Composable
fun ProfileCard(profile: Profile, onOpen: () -> Unit) {
    TextButton(onClick = onOpen) { Text(profile.name) }
}
// #endregion
