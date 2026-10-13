package snippets.composition_local.production

// #region show
@Composable
fun ProfileScreen(name: String) {
    Box(Modifier.padding(LocalSpacing.current)) { Text(name) }
}
// #endregion
