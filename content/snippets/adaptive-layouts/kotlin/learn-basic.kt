package snippets.adaptive_layouts.learn_basic

// #region show
@Composable
fun SettingsScreen() {
    val sizeClass = currentWindowAdaptiveInfo().windowSizeClass
    if (sizeClass.isWidthAtLeastBreakpoint(WindowSizeClass.WIDTH_DP_MEDIUM_LOWER_BOUND)) {
        SettingsGrid()
    } else {
        SettingsList()
    }
}
// #endregion
