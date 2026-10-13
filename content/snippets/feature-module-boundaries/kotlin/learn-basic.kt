package snippets.feature_module_boundaries.learn_basic

// #region show
data class Profile(val id: String, val name: String)
interface ProfileReader {
    suspend fun load(id: String): Profile
}
// #endregion
