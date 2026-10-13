package snippets.children.learn_basic

// #region show
@Composable
fun Card(content: @Composable () -> Unit) {
    Surface(shape = MaterialTheme.shapes.medium, content = content)
}
// #endregion
