package snippets.secure_storage.production

// #region show
sessionMutex.withLock {
    credentialStore.clear()
    sessionState.value = SessionState.SignedOut
}
// #endregion
