package snippets.theme.applied

// #region show
val useDarkColors = when (preference) {
    ThemePreference.System -> isSystemInDarkTheme()
    ThemePreference.Dark -> true
    ThemePreference.Light -> false
}
// #endregion
