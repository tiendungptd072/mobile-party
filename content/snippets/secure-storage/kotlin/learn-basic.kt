package snippets.secure_storage.learn_basic

import verification.support.*
// #region show
interface CredentialStore {
    suspend fun saveRefreshToken(token: String)
    suspend fun readRefreshToken(): String?
    suspend fun clear()
}
// #endregion
