package snippets.async.basic

import verification.support.*
import retrofit2.http.GET
import retrofit2.http.Path
// #region show
// userApi uses https://api.example.com/ and a JSON converter for User.
interface UserApi {
    @GET("users/{id}")
    suspend fun getUser(@Path("id") id: String): User
}

suspend fun loadUser(id: String): User {
    return userApi.getUser(id)
}
// #endregion
