package snippets.api_request.applied

import verification.support.*
interface UserApi { suspend fun getUser(id: String): UserDto }
// #region show
class UserRepository(private val api: UserApi) {
    suspend fun getUser(id: String): User {
        return api.getUser(id).toDomain()
    }
}
// #endregion
