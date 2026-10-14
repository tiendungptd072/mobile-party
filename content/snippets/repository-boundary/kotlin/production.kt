package snippets.repository_boundary.production

import verification.support.*
// #region show
class FakeProfileRepository(
    private val result: Profile,
) : ProfileRepository {
    override suspend fun getProfile(id: String): Profile = result
}
// #endregion
