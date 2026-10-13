package snippets.extension_functions.basic

// #region show
fun User.displayName(): String {
    return nickname?.trim().takeUnless { it.isNullOrEmpty() } ?: name
}
// #endregion
