package snippets.children.applied

// #region show
@Composable
fun Panel(
    header: @Composable () -> Unit,
    content: @Composable () -> Unit,
    actions: @Composable () -> Unit,
) {
    Column {
        header()
        content()
        Row { actions() }
    }
}
// #endregion
