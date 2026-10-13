package snippets.android_intents.learn_basic

// #region show
val uri = Uri.parse("https://example.com/help")
try {
    context.startActivity(Intent(Intent.ACTION_VIEW, uri))
} catch (_: ActivityNotFoundException) {
    showUnavailable()
}
// #endregion
