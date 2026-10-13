package snippets.layout.production

// #region show
@Composable
fun ProfileCard(content: @Composable ColumnScope.() -> Unit) {
    Column(Modifier.padding(AppSpacing.large), verticalArrangement = Arrangement.spacedBy(AppSpacing.medium), content = content)
}
// #endregion
