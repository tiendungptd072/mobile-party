package snippets.window_insets.basic

// #region show
@Composable
fun ProfileScreen() {
    Box(Modifier.fillMaxSize().safeDrawingPadding()) {
        Profile()
    }
}
// #endregion
