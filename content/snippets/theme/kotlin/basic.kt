package snippets.theme.basic

// #region show
@Composable
fun AppTheme(darkTheme: Boolean, content: @Composable () -> Unit) {
  MaterialTheme(
    colorScheme = if (darkTheme) darkColorScheme() else lightColorScheme(),
    content = content,
  )
}
// #endregion
