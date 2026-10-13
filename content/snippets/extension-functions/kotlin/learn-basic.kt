package snippets.extension_functions.learn_basic

// #region show
fun User.displayName(): String =
    nickname?.trim()?.takeIf(String::isNotEmpty) ?: name

val label = user.displayName()
// #endregion
