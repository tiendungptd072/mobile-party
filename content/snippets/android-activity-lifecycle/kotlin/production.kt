package snippets.android_activity_lifecycle.production

// #region show
@Composable
fun ItemsRoute(viewModel: ItemsViewModel) {
    val items by viewModel.items.collectAsStateWithLifecycle()
    ItemsScreen(items = items)
}
// #endregion
