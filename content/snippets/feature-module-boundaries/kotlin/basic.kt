package snippets.feature_module_boundaries.basic

// #region show
interface ProfileReader {
    suspend fun load(id: String): Profile
}
// #endregion
