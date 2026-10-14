package snippets.error_handling.applied

import verification.support.*
import java.net.UnknownHostException
// #region show
fun Throwable.toProfileError(): ProfileError = when (this) {
    is UnknownHostException -> ProfileError.Offline
    is ProfileNotFoundException -> ProfileError.NotFound
    else -> ProfileError.Unknown
}
// #endregion
