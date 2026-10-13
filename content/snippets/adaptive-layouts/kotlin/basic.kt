package snippets.adaptive_layouts.basic

// #region show
@Composable
fun MailScreen() {
    val sizeClass = currentWindowAdaptiveInfo().windowSizeClass
    if (sizeClass.isWidthAtLeastBreakpoint(WindowSizeClass.WIDTH_DP_MEDIUM_LOWER_BOUND)) {
        TwoPaneMail()
    } else {
        SinglePaneMail()
    }
}
// #endregion
