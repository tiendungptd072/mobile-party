package snippets.api_request.basic

// #region show
// userApi uses https://api.example.com/ and a JSON converter for User.
interface UserApi {
    @GET("users/{id}")
    suspend fun getUser(@Path("id") id: String): User
}

suspend fun getUser(id: String): User = userApi.getUser(id)
// #endregion
