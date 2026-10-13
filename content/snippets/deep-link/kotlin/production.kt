package snippets.deep_link.production

// #region show
suspend fun handleDeepLink(uri: Uri) {
    val destination = parser.parseAndValidate(uri) ?: return
    if (!session.isSignedIn()) {
        pendingLinks.save(destination)
        return navigator.openSignIn()
    }
    if (authorization.canOpen(destination)) navigator.open(destination)
}
// #endregion
