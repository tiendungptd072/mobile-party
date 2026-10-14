package snippets.extension_functions.basic

import verification.support.*
// #region show
fun User.displayName(): String {
    return nickname?.trim().takeUnless { it.isNullOrEmpty() } ?: name
}
// #endregion
