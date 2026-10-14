package snippets.authentication.applied

import verification.support.*
// #region show
suspend fun restoreSession() {
    val token = credentialStore.readRefreshToken()
        ?: return sessionState.emit(SessionState.SignedOut)
    val user = auth.refresh(token)
    sessionState.emit(SessionState.SignedIn(user))
}
// #endregion
