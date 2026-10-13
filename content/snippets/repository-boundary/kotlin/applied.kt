package snippets.repository_boundary.applied

// #region show
class OfflineFirstProfileRepository(
    private val api: ProfileApi,
) : ProfileRepository {
    override suspend fun getProfile(id: String): Profile {
        return api.getProfile(id).toDomain()
    }
}
// #endregion
