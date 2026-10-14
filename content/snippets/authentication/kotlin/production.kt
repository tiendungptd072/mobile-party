package snippets.authentication.production

import verification.support.*
import kotlinx.coroutines.sync.*
// #region show
suspend fun refreshOnce(): Token = refreshMutex.withLock {
    tokenStore.currentValidToken() ?: auth.refresh().also(tokenStore::save)
}
// #endregion
