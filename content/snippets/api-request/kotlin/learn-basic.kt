package snippets.api_request.learn_basic

// #region show
interface UserApi {
    @GET("users/{id}")
    suspend fun getUser(@Path("id") id: String): UserDto
}
// #endregion
