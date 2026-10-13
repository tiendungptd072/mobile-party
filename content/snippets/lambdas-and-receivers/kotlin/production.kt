package snippets.lambdas_and_receivers.production

// #region show
@Composable
fun ActionBar(
    actions: @Composable RowScope.(enabled: Boolean) -> Unit,
) {
    Row { actions(true) }
}
// #endregion
