package snippets.authentication.production

// #region show
suspend fun refreshOnce(): Token = refreshMutex.withLock {
    tokenStore.currentValidToken() ?: auth.refresh().also(tokenStore::save)
}
// #endregion
