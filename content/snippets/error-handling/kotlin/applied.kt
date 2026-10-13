package snippets.error_handling.applied

// #region show
fun Throwable.toProfileError(): ProfileError = when (this) {
    is UnknownHostException -> ProfileError.Offline
    is ProfileNotFoundException -> ProfileError.NotFound
    else -> ProfileError.Unknown
}
// #endregion
