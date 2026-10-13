package snippets.composition_local.basic

// #region show
val LocalSpacing = compositionLocalOf { 8.dp }

@Composable
fun Card() {
    Box(Modifier.padding(LocalSpacing.current)) { Text("Profile") }
}

@Composable
fun Screen() {
    CompositionLocalProvider(LocalSpacing provides 16.dp) { Card() }
}
// #endregion
