package snippets.android_intents.basic

// #region show
fun openHelp(context: Context) {
    val uri = Uri.parse("https://example.com/help")
    try {
        context.startActivity(Intent(Intent.ACTION_VIEW, uri))
    } catch (_: ActivityNotFoundException) {
        showUnavailable()
    }
}
// #endregion
