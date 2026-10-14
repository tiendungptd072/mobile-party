package snippets.api_request.learn_basic

import verification.support.*
import retrofit2.http.GET
import retrofit2.http.Path
// #region show
interface UserApi {
    @GET("users/{id}")
    suspend fun getUser(@Path("id") id: String): UserDto
}
// #endregion
