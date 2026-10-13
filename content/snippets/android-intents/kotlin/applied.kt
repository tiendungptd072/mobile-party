package snippets.android_intents.applied

// #region show
val send = Intent(Intent.ACTION_SEND).apply {
    type = "text/plain"
    putExtra(Intent.EXTRA_TEXT, "Read this: https://example.com/article")
}
context.startActivity(Intent.createChooser(send, null))
// #endregion
