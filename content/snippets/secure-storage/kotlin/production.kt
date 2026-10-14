package snippets.secure_storage.production

import verification.support.*
import kotlinx.coroutines.sync.*
suspend fun verificationSnippet() {
// #region show
sessionMutex.withLock {
    credentialStore.clear()
    sessionState.value = SessionState.SignedOut
}
// #endregion

}
