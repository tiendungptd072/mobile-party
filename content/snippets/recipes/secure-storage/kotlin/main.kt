package snippets.recipes.secure_storage

// #region show
interface CredentialStore {
    suspend fun saveToken(token: String)
    suspend fun readToken(): String?
    suspend fun clear()
}

// The Android implementation encrypts values with a Keystore-held key.
// #endregion
