package snippets.repository_boundary.applied

import verification.support.*
// #region show
class OfflineFirstProfileRepository(
    private val api: ProfileApi,
) : ProfileRepository {
    override suspend fun getProfile(id: String): Profile {
        return api.getProfile(id).toDomain()
    }
}
// #endregion
