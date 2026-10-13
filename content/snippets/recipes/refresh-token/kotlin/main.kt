package snippets.recipes.refresh_token

// #region show
class TokenAuthenticator(
    initialToken: String,
    private val refreshAccessToken: () -> String,
    private val onSignOut: () -> Unit,
) : Authenticator {
    // The request interceptor reads this token before sending a GET.
    @Volatile var accessToken: String? = initialToken
        private set

    override fun authenticate(route: Route?, response: Response): Request? {
        if (response.request.method != "GET") return null
        val challenges = generateSequence(response) { it.priorResponse }
            .count { it.code == 401 }
        if (challenges >= 2) return null

        val token = synchronized(this) {
            val current = accessToken ?: return null
            if (response.request.header("Authorization") != "Bearer $current") {
                current
            } else {
                try {
                    val renewed = refreshAccessToken()
                    check(renewed.isNotBlank() && renewed != current)
                    accessToken = renewed
                    renewed
                } catch (cancelled: CancellationException) {
                    throw cancelled
                } catch (_: Exception) {
                    accessToken = null
                    onSignOut()
                    return null
                }
            }
        }
        return response.request.newBuilder()
            .header("Authorization", "Bearer $token")
            .build()
    }
}
// #endregion
