package snippets.secure_storage.learn_basic

// #region show
interface CredentialStore {
    suspend fun saveRefreshToken(token: String)
    suspend fun readRefreshToken(): String?
    suspend fun clear()
}
// #endregion
