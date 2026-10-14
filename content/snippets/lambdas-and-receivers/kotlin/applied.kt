package snippets.lambdas_and_receivers.applied

import verification.support.*
import kotlin.time.Duration.Companion.seconds
// #region show
val request = buildRequest {
    header("Accept", "application/json")
    timeout(5.seconds)
}
// #endregion
