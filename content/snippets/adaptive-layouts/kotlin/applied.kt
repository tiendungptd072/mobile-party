package snippets.adaptive_layouts.applied

// #region show
@Composable
fun MailScreen(selectedId: String?) {
    val sizeClass = currentWindowAdaptiveInfo().windowSizeClass
    if (sizeClass.isWidthAtLeastBreakpoint(WindowSizeClass.WIDTH_DP_MEDIUM_LOWER_BOUND)) {
        TwoPaneMail(selectedId)
    } else {
        SinglePaneMail(selectedId)
    }
}
// #endregion
