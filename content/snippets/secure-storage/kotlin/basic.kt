package snippets.secure_storage.basic

// #region show
interface SessionStore {
  suspend fun saveRefreshToken(token: String)
  suspend fun readRefreshToken(): String?
  suspend fun clear()
}

// The implementation encrypts values using an Android Keystore key.
// #endregion
