package snippets.children.basic

// #region show
@Composable
fun Panel(content: @Composable () -> Unit) {
    Surface(shape = RoundedCornerShape(12.dp)) { content() }
}

Panel { Text("Profile") }
// #endregion
