package snippets.feature_module_boundaries.basic

import verification.support.*
// #region show
interface ProfileReader {
    suspend fun load(id: String): Profile
}
// #endregion
