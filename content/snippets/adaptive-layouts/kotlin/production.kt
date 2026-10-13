package snippets.adaptive_layouts.production

// #region show
@Composable
fun MailRoute(viewModel: MailViewModel = viewModel()) {
    val selectedId by viewModel.selectedId.collectAsStateWithLifecycle()
    MailScreen(selectedId = selectedId)
}
// #endregion
